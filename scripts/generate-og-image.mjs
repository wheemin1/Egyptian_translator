import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outPath = path.resolve("public", "og-image.png");

const WIDTH = 1200;
const HEIGHT = 630;

// Simple, clean OG image matching the site's vibe:
// - Background: sand beige (#F9F7F2)
// - Left: headline text
// - Right: cartouche-like frame + a few hieroglyph-ish glyph blocks
// - Badge: "AI 뜻 번역 탑재"
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d4b56b"/>
      <stop offset="50%" stop-color="#c5a059"/>
      <stop offset="100%" stop-color="#9a7b3a"/>
    </linearGradient>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur"/>
      <feOffset in="blur" dx="0" dy="8" result="off"/>
      <feColorMatrix in="off" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" result="shadow"/>
      <feComposite in="shadow" in2="SourceGraphic" operator="over"/>
    </filter>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#F9F7F2"/>

  <!-- Left copy -->
  <g transform="translate(88, 140)">
    <text x="0" y="0" fill="#1f1a12" font-size="64" font-weight="800" font-family="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans KR, Arial">
      이집트 상형문자 번역기
    </text>

    <text x="0" y="70" fill="#3a2f22" font-size="28" font-weight="600" font-family="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans KR, Arial">
      단순 변환 NO, 뜻까지 번역하는 AI
    </text>

    <g transform="translate(0, 112)">
      <rect x="0" y="0" rx="16" ry="16" width="210" height="44" fill="url(#gold)"/>
      <text x="105" y="30" text-anchor="middle" fill="#1f1a12" font-size="18" font-weight="800" font-family="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans KR, Arial">
        AI 뜻 번역 탑재
      </text>
    </g>

    <text x="0" y="210" fill="#6b5a45" font-size="22" font-weight="600" font-family="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans KR, Arial">
      한글 이름·문장 → 영어(DeepL) → 상형문자
    </text>

    <text x="0" y="252" fill="#6b5a45" font-size="22" font-weight="600" font-family="system-ui, -apple-system, Segoe UI, Roboto, Noto Sans KR, Arial">
      카르투슈 결과를 이미지로 저장
    </text>
  </g>

  <!-- Right visual: cartouche card -->
  <g transform="translate(760, 120)" filter="url(#softShadow)">
    <rect x="0" y="0" rx="28" ry="28" width="360" height="390" fill="#ffffff" opacity="0.65"/>

    <!-- inner card -->
    <rect x="28" y="28" rx="22" ry="22" width="304" height="334" fill="#F9F7F2" stroke="url(#gold)" stroke-width="4"/>

    <!-- cartouche frame -->
    <rect x="74" y="70" rx="60" ry="60" width="212" height="210" fill="none" stroke="url(#gold)" stroke-width="10"/>
    <rect x="92" y="92" rx="52" ry="52" width="176" height="166" fill="none" stroke="#c5a059" stroke-width="2" opacity="0.55"/>

    <!-- pseudo-hieroglyph blocks -->
    <g transform="translate(110, 132)">
      <rect x="0" y="0" width="26" height="26" rx="6" fill="#1f1a12" opacity="0.85"/>
      <rect x="34" y="0" width="26" height="26" rx="6" fill="#1f1a12" opacity="0.55"/>
      <rect x="68" y="0" width="26" height="26" rx="6" fill="#1f1a12" opacity="0.75"/>

      <rect x="0" y="38" width="26" height="26" rx="6" fill="#1f1a12" opacity="0.6"/>
      <rect x="34" y="38" width="26" height="26" rx="6" fill="#1f1a12" opacity="0.8"/>
      <rect x="68" y="38" width="26" height="26" rx="6" fill="#1f1a12" opacity="0.5"/>

      <rect x="0" y="76" width="26" height="26" rx="6" fill="#1f1a12" opacity="0.75"/>
      <rect x="34" y="76" width="26" height="26" rx="6" fill="#1f1a12" opacity="0.55"/>
      <rect x="68" y="76" width="26" height="26" rx="6" fill="#1f1a12" opacity="0.85"/>
    </g>

    <!-- English line -->
    <text x="180" y="316" text-anchor="middle" fill="#1f1a12" font-size="18" font-weight="800" letter-spacing="6" font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial">
      I love you
    </text>
  </g>
</svg>`;

const png = await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toBuffer();

await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.writeFile(outPath, png);

console.log(`Wrote ${outPath} (${WIDTH}x${HEIGHT})`);
