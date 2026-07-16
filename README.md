# Jean Lorenz Recato — Portfolio

Static portfolio site for Jean Lorenz Recato, a Duda website designer & developer. Built from a Claude Design handoff (`.dc.html` prototype) as plain HTML/CSS/JS — no build step, no framework.

## Structure

- `index.html` — full single-page markup
- `css/styles.css` — design tokens, layout, responsive rules
- `js/main.js` — mobile menu, marquee, FAQ accordion, process timeline, scroll reveal, stat counters, contact form
- `assets/` — images, favicon, Open Graph image
- `robots.txt`, `sitemap.xml` — technical SEO

## Local development

No build step — just serve the directory:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Production domain

The production domain is `https://jeanrecato.com/` (custom domain on Vercel). It is referenced in `index.html`, `robots.txt`, and `sitemap.xml`.
