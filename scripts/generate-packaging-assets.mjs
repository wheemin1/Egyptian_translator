import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = path.resolve(process.cwd());
const PUBLIC_DIR = path.join(ROOT, "public");

function u32BE(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n >>> 0, 0);
  return b;
}

// CRC32 (IEEE 802.3)
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = u32BE(data.length);
  const crc = u32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function writePngRGBA({ width, height, pixelFn }) {
  // Each scanline: filter byte + RGBA*width
  const stride = 1 + width * 4;
  const raw = Buffer.alloc(stride * height);

  for (let y = 0; y < height; y++) {
    const rowStart = y * stride;
    raw[rowStart] = 0; // filter type 0
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y);
      const i = rowStart + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }

  const ihdr = Buffer.concat([
    u32BE(width),
    u32BE(height),
    Buffer.from([
      8, // bit depth
      6, // color type RGBA
      0, // compression
      0, // filter
      0, // interlace
    ]),
  ]);

  const idat = zlib.deflateSync(raw, { level: 9 });

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const png = Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);

  return png;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

const PAPYRUS = hexToRgb("#F9F7F2");
const GOLD = hexToRgb("#C5A059");

function makeIcon({ width, height }) {
  const border = Math.max(2, Math.floor(Math.min(width, height) * 0.06));
  const cx = (width - 1) / 2;
  const cy = (height - 1) / 2;
  const rx = width * 0.28;
  const ry = height * 0.18;
  const pr = Math.min(width, height) * 0.07;

  return writePngRGBA({
    width,
    height,
    pixelFn: (x, y) => {
      // background
      let [r, g, b] = PAPYRUS;

      // border
      if (x < border || x >= width - border || y < border || y >= height - border) {
        [r, g, b] = GOLD;
      }

      // simple "eye" shape: ellipse outline + pupil dot
      const dx = x - cx;
      const dy = y - cy;
      const ellipse = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);
      const ellipseInner = (dx * dx) / ((rx - 1.5) * (rx - 1.5)) + (dy * dy) / ((ry - 1.5) * (ry - 1.5));
      const isOutline = ellipse <= 1.0 && ellipseInner >= 1.0;

      const pupil = dx * dx + dy * dy <= pr * pr;

      if (isOutline || pupil) {
        [r, g, b] = GOLD;
      }

      return [r, g, b, 255];
    },
  });
}

function makeOgImage() {
  const width = 1200;
  const height = 630;
  const band = 110;

  // 16x16 dot-matrix glyphs for the two requested Korean lines.
  // The goal is legibility at large scale; this is intentionally minimal.
  const K16 = {
    "고": [
      "1111111111110000",
      "1100000000010000",
      "1100000000010000",
      "1100000000010000",
      "1111111111110000",
      "1100000000000000",
      "1100000000000000",
      "1100000000000000",
      "1100001111110000",
      "1100001100010000",
      "1100001100010000",
      "1100001100010000",
      "1100001111110000",
      "1100000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "대": [
      "1100000000000000",
      "1100000000000000",
      "1100000000000000",
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "0000010000000000",
      "0000010000000000",
      "0000010000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "이": [
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "집": [
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000110000000000",
      "0000110000000000",
      "0000110000000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "트": [
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "어": [
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000110000000000",
      "0000110000000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000001100000000",
      "0000001100000000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "번": [
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "역": [
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000110000000000",
      "0000110000000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000010000010000",
      "0000010000010000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "기": [
      "1111111111110000",
      "1100000000000000",
      "1100000000000000",
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "1100000000000000",
      "1100000000000000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "내": [
      "1100000000000000",
      "1100000000000000",
      "1111111111110000",
      "0000010000010000",
      "0000010000010000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "름": [
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000110000000000",
      "0000110000000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000000000110000",
      "0000000000110000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "을": [
      "1111111111110000",
      "0000000000110000",
      "0000000000110000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000000000110000",
      "0000000000110000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "파": [
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "라": [
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000110000000000",
      "0000110000000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000010000000000",
      "0000010000000000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "오": [
      "0000111111000000",
      "0001100001100000",
      "0011000000110000",
      "0011000000110000",
      "0011000000110000",
      "0011000000110000",
      "0011000000110000",
      "0011000000110000",
      "0011000000110000",
      "0011000000110000",
      "0001100001100000",
      "0000111111000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "의": [
      "1111111111110000",
      "0000001100000000",
      "0000001100000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000001100000000",
      "0000001100000000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "언": [
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000110000000000",
      "0000110000000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "1100000000000000",
      "1100000000000000",
      "1111111111110000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    "로": [
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000110000000000",
      "0000110000000000",
      "1111111111110000",
      "1100000000110000",
      "1100000000110000",
      "1111111111110000",
      "0000111111000000",
      "0001100001100000",
      "0001100001100000",
      "0000111111000000",
      "0000000000000000",
      "0000000000000000",
      "0000000000000000",
    ],
    " ": new Array(16).fill("0000000000000000"),
  };

  function hangulTextWidth(text, glyphW, spacing) {
    const chars = Array.from(text);
    return chars.length * (glyphW + spacing) - spacing;
  }

  function makeHangulMask(text, scale, centerX, y0) {
    const glyphW = 16;
    const glyphH = 16;
    const spacing = 4;
    const chars = Array.from(text);
    const w = hangulTextWidth(text, glyphW, spacing);
    const x0 = Math.round(centerX - (w * scale) / 2);

    return {
      hit: (x, y) => {
        const relX = x - x0;
        const relY = y - y0;
        if (relX < 0 || relY < 0) return false;
        const gx = Math.floor(relX / scale);
        const gy = Math.floor(relY / scale);
        if (gy < 0 || gy >= glyphH) return false;
        const charIndex = Math.floor(gx / (glyphW + spacing));
        const within = gx - charIndex * (glyphW + spacing);
        if (within < 0 || within >= glyphW) return false;
        if (charIndex < 0 || charIndex >= chars.length) return false;
        const ch = chars[charIndex];
        const bmp = K16[ch] ?? K16[" "];
        return bmp[gy][within] === "1";
      },
    };
  }

  const titleMask = makeHangulMask("고대 이집트어 번역기", 8, width / 2, 250);
  const subtitleMask = makeHangulMask("내 이름을 파라오의 언어로", 5, width / 2, 400);

  // icon (Eye-like) at top center
  const iconCx = width / 2;
  const iconCy = 165;
  const iconRx = 120;
  const iconRy = 70;
  const iconStroke = 10;
  const pupilR = 22;

  return writePngRGBA({
    width,
    height,
    pixelFn: (x, y) => {
      // background with subtle noise
      const n = (x * 1103515245 + y * 12345) >>> 0;
      const jitter = ((n >>> 16) & 7) - 3;
      let r = Math.max(0, Math.min(255, PAPYRUS[0] + jitter));
      let g = Math.max(0, Math.min(255, PAPYRUS[1] + jitter));
      let b = Math.max(0, Math.min(255, PAPYRUS[2] + jitter));

      // top band
      if (y < band) {
        r = GOLD[0];
        g = GOLD[1];
        b = GOLD[2];
      }

      // border
      const outer = 10;
      if (x < outer || x >= width - outer || y < outer || y >= height - outer) {
        r = GOLD[0];
        g = GOLD[1];
        b = GOLD[2];
      }

      // icon stroke (ellipse + pupil)
      const dx = x - iconCx;
      const dy = y - iconCy;
      const e = (dx * dx) / (iconRx * iconRx) + (dy * dy) / (iconRy * iconRy);
      const eInner = (dx * dx) / ((iconRx - iconStroke) * (iconRx - iconStroke)) +
        (dy * dy) / ((iconRy - iconStroke) * (iconRy - iconStroke));
      const iconOutline = e <= 1.0 && eInner >= 1.0;
      const pupil = dx * dx + dy * dy <= pupilR * pupilR;
      if (iconOutline || pupil) {
        r = GOLD[0];
        g = GOLD[1];
        b = GOLD[2];
      }

      // text color (darker gold)
      const textR = Math.max(0, GOLD[0] - 18);
      const textG = Math.max(0, GOLD[1] - 28);
      const textB = Math.max(0, GOLD[2] - 32);
      if (titleMask.hit(x, y) || subtitleMask.hit(x, y)) {
        r = textR;
        g = textG;
        b = textB;
      }

      // band label (small, simple blocks)
      if (y > 40 && y < 70 && x > 80 && x < width - 80) {
        if ((x + y) % 37 === 0) {
          r = PAPYRUS[0];
          g = PAPYRUS[1];
          b = PAPYRUS[2];
        }
      }

      return [r, g, b, 255];
    },
  });
}

function makeIcoFromPngs(pngImages) {
  // ICO file that embeds PNG images (supported by modern browsers)
  // ICONDIR: reserved(2) type(2) count(2)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngImages.length, 4);

  const dirEntries = Buffer.alloc(16 * pngImages.length);
  let imageOffset = header.length + dirEntries.length;

  pngImages.forEach(({ size, data }, idx) => {
    const entryOffset = idx * 16;
    dirEntries.writeUInt8(size === 256 ? 0 : size, entryOffset + 0); // width
    dirEntries.writeUInt8(size === 256 ? 0 : size, entryOffset + 1); // height
    dirEntries.writeUInt8(0, entryOffset + 2); // color count
    dirEntries.writeUInt8(0, entryOffset + 3); // reserved
    dirEntries.writeUInt16LE(1, entryOffset + 4); // planes
    dirEntries.writeUInt16LE(32, entryOffset + 6); // bit count
    dirEntries.writeUInt32LE(data.length, entryOffset + 8); // bytes in res
    dirEntries.writeUInt32LE(imageOffset, entryOffset + 12); // offset
    imageOffset += data.length;
  });

  return Buffer.concat([header, dirEntries, ...pngImages.map((i) => i.data)]);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFile(rel, buf) {
  const outPath = path.join(ROOT, rel);
  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, buf);
  console.log(`wrote ${rel}`);
}

ensureDir(PUBLIC_DIR);

const png16 = makeIcon({ width: 16, height: 16 });
const png32 = makeIcon({ width: 32, height: 32 });

writeFile("public/favicon-16x16.png", png16);
writeFile("public/favicon-32x32.png", png32);
writeFile(
  "public/favicon.ico",
  makeIcoFromPngs([
    { size: 16, data: png16 },
    { size: 32, data: png32 },
  ])
);

writeFile("public/apple-touch-icon.png", makeIcon({ width: 180, height: 180 }));
writeFile("public/og-image.png", makeOgImage());
