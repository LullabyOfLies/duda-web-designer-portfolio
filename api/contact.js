// Vercel serverless function: receives the contact form POST and emails it via Resend.
// Uses the built-in fetch (Node 18+), so no package.json / dependencies are required.

// ---- In-memory rate limiter (per IP, fixed window) ----
// NOTE: serverless instances are ephemeral, so this map resets on cold starts and is
// per-instance. It's a solid first layer against casual abuse; for strict, consistent
// limits across all instances use an external store (e.g. Upstash Redis / Vercel KV).
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5;                    // max submissions per IP per window
const rateStore = new Map();           // ip -> [timestamp, ...]

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  return typeof xff === 'string' ? xff.split(',')[0].trim() : (xff || req.socket?.remoteAddress || 'unknown');
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let data;
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const { firstName, lastName, email, service, message, honeypot } = data;

  // Honeypot: hidden field real users never fill in. Pretend success, drop silently.
  if (honeypot) return res.status(200).json({ ok: true });

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

  const name = `${firstName || ''} ${lastName || ''}`.trim();
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message is too long.' });
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
