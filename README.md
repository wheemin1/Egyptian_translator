# Pharaoh's Name Translator

Korean name → romanization → Egyptian hieroglyph **Unicode** glyphs, shown as a “Cartouche certificate”.

Live: https://egyptiantranslator.netlify.app/

## What it does

- Type your name (Korean supported) and optionally edit the romanized spelling
- Convert to an Egyptian-hieroglyph look using a simple letter→glyph mapping
- Copy the **glyph text**, save a **high‑res PNG**, or share the result
- Includes below-the-fold content (history/logic/FAQ/disclaimer) for SEO/AdSense readiness

## Tech

- Vite + React + TypeScript
- Tailwind + shadcn/ui
- Framer Motion, html2canvas
- Font: Noto Sans Egyptian Hieroglyphs

## Run locally

```bash
npm install
npm run dev
```

Dev server: http://localhost:8085/

## Build

```bash
npm run build
npm run preview
```

## Deploy (Netlify)

This repo is set up for Netlify continuous deployment.

- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing: handled via `netlify.toml`

## SEO / Social / AdSense files

- Open Graph image: `public/og-image.png`
- Icons: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`
- robots/sitemap: `public/robots.txt`, `public/sitemap.xml`
- AdSense `ads.txt`: `public/ads.txt` (replace `pub-0000...` with your real publisher id)
- Legal pages:
	- `/privacy` → `src/pages/Privacy.tsx`
	- `/terms` → `src/pages/Terms.tsx`
