// Vercel serverless function: receives the contact form POST and emails it via Resend.
// Uses the built-in fetch (Node 18+), so no package.json / dependencies are required.

import { promises as dns } from 'node:dns';

// Hostnames a Turnstile token is allowed to have been issued on.
const ALLOWED_HOSTNAMES = new Set(['jeanrecato.com', 'www.jeanrecato.com']);

// Submissions faster than this after page load are treated as bots (silently dropped).
const MIN_FILL_MS = 3000;

// Spam almost always carries links; real inquiries rarely need more than a couple.
const MAX_LINKS = 2;
const LINK_RE = /\bhttps?:\/\/|\bwww\./gi;
// HTML anchors and BBCode links are a forum-spam signature no real visitor types.
const MARKUP_LINK_RE = /<\s*a\s[^>]*href|\[\s*(url|link)\b/i;

// Common throwaway-email domains (not exhaustive; MX lookup below catches made-up domains).
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com',
  'temp-mail.org', 'tempmail.com', 'tempmail.net', 'yopmail.com', 'yopmail.net', 'trashmail.com',
  'getnada.com', 'nada.email', 'dispostable.com', 'maildrop.cc', 'fakeinbox.com', 'throwawaymail.com',
  'mintemail.com', 'mohmal.com', 'emailondeck.com', 'tempail.com', 'burnermail.io', 'spamgourmet.com',
  'mailnesia.com', 'mytemp.email', 'tempr.email', 'discard.email', 'example.com', 'test.com',
]);

// ---- In-memory rate limiter (per IP, fixed window) ----
// NOTE: serverless instances are ephemeral, so this map resets on cold starts and is
// per-instance. It's a solid first layer against casual abuse; for strict, consistent
// limits across all instances use an external store (e.g. Upstash Redis / Vercel KV).
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5;                    // max submissions per IP per window
const rateStore = new Map();           // ip -> [timestamp, ...]

// Max lengths per field (characters) and their user-facing labels.
const LIMITS = { firstName: 100, lastName: 100, email: 254, service: 100, message: 5000 };
const LABELS = { firstName: 'First name', lastName: 'Last name', email: 'Email', service: 'Service', message: 'Message' };

function getClientIp(req) {
  // Vercel sets x-real-ip to the connecting client's IP; fall back to x-forwarded-for.
  const real = req.headers['x-real-ip'];
  if (typeof real === 'string' && real) return real.trim();
  const xff = req.headers['x-forwarded-for'];
  return typeof xff === 'string' ? xff.split(',')[0].trim() : (req.socket?.remoteAddress || 'unknown');
}

// Only accept submissions sent by a browser on this same site (blocks cross-site posting
// and lazy scripts; not a substitute for Turnstile since the header can be forged).
function isSameOrigin(req) {
  const origin = req.headers.origin;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// Verify a Cloudflare Turnstile token server-side. Returns true only on a confirmed pass.
async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not set; rejecting submission.');
    return false;
  }
  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip !== 'unknown') body.append('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const result = await r.json();
    if (!result.success) {
      console.warn('Turnstile rejected:', result['error-codes']);
      return false;
    }
    if (!ALLOWED_HOSTNAMES.has(result.hostname)) {
      console.warn('Turnstile token issued for unexpected hostname:', result.hostname);
      return false;
    }
    return true;
  } catch (e) {
    console.error('Turnstile verify error:', e);
    return false;
  }
}

// Returns false only when the domain definitely can't receive mail (no MX/A records).
// Lookup timeouts or resolver errors fail open so real visitors are never blocked by DNS hiccups.
async function domainAcceptsMail(domain) {
  const lookup = (async () => {
    try {
      const mx = await dns.resolveMx(domain);
      if (mx.length > 0) return true;
    } catch (e) {
      if (e.code !== 'ENODATA' && e.code !== 'ENOTFOUND') return true;
    }
    // RFC 5321: with no MX record, mail falls back to the domain's A record.
    try {
      return (await dns.resolve4(domain)).length > 0;
    } catch (e) {
      return e.code !== 'ENODATA' && e.code !== 'ENOTFOUND';
    }
  })();
  const timeout = new Promise((resolve) => setTimeout(() => resolve(true), 3000));
  return Promise.race([lookup, timeout]);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!isSameOrigin(req)) return res.status(403).json({ error: 'Forbidden.' });

  let data;
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid request body.' });
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const { honeypot, turnstileToken, elapsedMs } = data;

  // Honeypot: hidden field real users never fill in. Pretend success, drop silently.
  if (honeypot) return res.status(200).json({ ok: true });

  // Too fast (or missing timing) means a script, not a person. Pretend success, drop silently.
  if (typeof elapsedMs !== 'number' || elapsedMs < MIN_FILL_MS) {
    return res.status(200).json({ ok: true });
  }

  // Accept only string fields (or missing), trimmed.
  const fields = {};
  for (const key of Object.keys(LIMITS)) {
    const v = data[key];
    if (v != null && typeof v !== 'string') {
      return res.status(400).json({ error: 'Invalid request body.' });
    }
    fields[key] = (v || '').trim();
    if (fields[key].length > LIMITS[key]) {
      return res.status(400).json({ error: `${LABELS[key]} is too long.` });
    }
  }
  const { firstName, lastName, email, service, message } = fields;

  // Rate limit per IP (fixed window). Bots caught by the honeypot above never reach here.
  const ip = getClientIp(req);
  const now = Date.now();
  const hits = (rateStore.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length === 0) rateStore.delete(ip);
  if (hits.length >= RATE_MAX) {
    const retryAfter = Math.ceil((RATE_WINDOW_MS - (now - hits[0])) / 1000);
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }
  hits.push(now);
  rateStore.set(ip, hits);

  // Collapse line breaks/whitespace runs: the name ends up in the email subject line.
  const name = `${firstName || ''} ${lastName || ''}`.replace(/\s+/g, ' ').trim();
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  if (`${firstName} ${lastName}`.match(LINK_RE)) {
    return res.status(400).json({ error: 'Please enter your name without links.' });
  }
  if (MARKUP_LINK_RE.test(message)) {
    return res.status(400).json({ error: 'Please remove HTML or link markup from your message.' });
  }
  if ((message.match(LINK_RE) || []).length > MAX_LINKS) {
    return res.status(400).json({ error: `Please include no more than ${MAX_LINKS} links in your message.` });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  const emailDomain = email.split('@').pop().toLowerCase();
  if (DISPOSABLE_DOMAINS.has(emailDomain)) {
    return res.status(400).json({ error: 'Please use a permanent email address so I can reply.' });
  }
  if (!(await domainAcceptsMail(emailDomain))) {
    return res.status(400).json({ error: 'That email domain can’t receive mail. Please check the address.' });
  }

  // Bot check: requests that didn't come through the real form have no valid token.
  if (typeof turnstileToken !== 'string' || !turnstileToken || turnstileToken.length > 2048) {
    return res.status(400).json({ error: 'Security check failed. Please refresh the page and try again.' });
  }
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return res.status(403).json({ error: 'Security check failed. Please refresh the page and try again.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Email service is not configured.' });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeService = escapeHtml(service || 'Not specified');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const text =
    `New project inquiry from ${name} (${email})\n` +
    `Service: ${service || 'Not specified'}\n\n${message}`;

  const html = `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
    <p><strong>Service:</strong> ${safeService}</p>
    <p><strong>Message:</strong></p>
    <p>${safeMessage}</p>
  `;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'jeanrecato25@gmail.com',
        reply_to: email,
        subject: `Project inquiry from ${name}`,
        text,
        html,
      }),
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      console.error('Resend error:', err);
      return res.status(502).json({ error: 'Could not send message. Please try again later.' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Contact function error:', e);
    return res.status(500).json({ error: 'Could not send message. Please try again later.' });
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}
