# Ark Noah's Greece — coming soon (arknoah.gr)

Static single-page "coming soon" stub for the new Ark Noah's Greece office in Athens.
Served by nginx in a container, deployed through Coolify (server `51.91.121.80`).

## What is inside

```
Dockerfile          nginx:1.27-alpine, copies nginx.conf + public/
nginx.conf          gzip, security headers, /healthz, long cache for assets
public/
  index.html        the page (EL default, EN/RU switchable)
  assets/styles.css
  assets/app.js     language switch (EL/EN/RU), title + meta updates
  assets/emblem.webp
  assets/fonts/     Manrope variable, self-hosted (latin, greek, cyrillic)
  og-image.png      1200x630 social card
  favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png
  robots.txt, sitemap.xml, site.webmanifest, 404.html
```

No build step, no JavaScript framework, no third-party requests.
Total page weight is roughly 150 KB, of which ~52 KB is the self-hosted font.

## Local preview

```bash
cd public && python3 -m http.server 8099
# http://127.0.0.1:8099/?lang=el
```

## Docker

```bash
docker build -t arknoah-greece-soon .
docker run --rm -p 8080:80 arknoah-greece-soon
# http://127.0.0.1:8080/healthz -> ok
```

## Deployed on Coolify

- Project: `Ark Noah's Greece`, application build pack: Dockerfile
- Domains: `https://arknoah.gr`, `https://www.arknoah.gr`
- Container port: `80`, health check path: `/healthz`

Content is intentionally limited to facts the office can stand behind:
no opening date, no phone number, no street address, no case numbers.
