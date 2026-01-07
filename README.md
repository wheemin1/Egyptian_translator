# Pharaoh's Name Translator

Korean text → English translation → Egyptian hieroglyph **Unicode** glyphs, shown as a “Cartouche certificate”.

Live: https://egyptiantranslator.netlify.app/

## What it does

- Type Korean text (or English text) and optionally edit the English spelling
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

# If you want translation (DeepL) locally, use Netlify dev so Functions work:
npx netlify dev

# Or run Vite only (UI works, but translation endpoint won't exist locally):
# npm run dev
```

Local URLs:

- Netlify dev (Functions enabled): http://localhost:8085/
- Vite dev (UI only): http://localhost:5173/

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

### Translation (DeepL) + secret handling

This app calls a Netlify Function (`/.netlify/functions/translate`) to translate KO → EN.
The DeepL key is **never** stored in the frontend.

- Add `DEEPL_API_KEY` in Netlify → Site settings → Environment variables
- Function source: `netlify/functions/translate.ts`

## SEO / Social / AdSense files

- Open Graph image: `public/og-image.png`
- Icons: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`
- robots/sitemap: `public/robots.txt`, `public/sitemap.xml`
- AdSense `ads.txt`: `public/ads.txt` (replace `pub-0000...` with your real publisher id)
- Legal pages:
	- `/privacy` → `src/pages/Privacy.tsx`
	- `/terms` → `src/pages/Terms.tsx`
