// Vercel serverless function: receives the contact form POST and emails it via Resend.
// Uses the built-in fetch (Node 18+), so no package.json / dependencies are required.
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
