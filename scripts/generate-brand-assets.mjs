import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const paper = "#f4f2ec",
  blue = "#365cf5",
  ink = "#131820";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${paper}"/>
<g fill="none" stroke="${blue}"><circle cx="80" cy="70" r="13" stroke-width="3.5"/></g>
<circle cx="120" cy="70" r="15" fill="${blue}"/>
<text x="155" y="80" font-family="Arial, sans-serif" font-size="31" font-weight="700" letter-spacing="-1" fill="${ink}">Selfbyt</text>
<path d="M64 116H1136M64 551H1136" stroke="#d1d2cc"/>
<g font-family="Arial, sans-serif" font-size="70" font-weight="600" letter-spacing="-3" fill="${ink}">
<text x="64" y="235">Intelligence.</text><text x="64" y="315">Built from</text><text x="64" y="395" fill="${blue}">the foundations.</text></g>
<text x="67" y="453" font-family="Arial, sans-serif" font-size="21" fill="#555f6b">AI infrastructure and experimental research.</text>
<g fill="none" stroke="${blue}"><circle cx="860" cy="290" r="116"/><circle cx="860" cy="290" r="95"/><circle cx="860" cy="290" r="74"/></g>
<circle cx="1000" cy="335" r="125" fill="${blue}"/>
<g stroke="${paper}" fill="none" opacity=".22">${[20, 40, 60, 80, 100].map((r) => `<ellipse cx="1000" cy="335" rx="${r}" ry="125"/>`).join("")}</g>
<path d="M860 290H1000V335" stroke="${ink}" fill="none"/><circle cx="860" cy="290" r="4" fill="${blue}"/><circle cx="1000" cy="335" r="4" fill="${paper}"/>
<text x="64" y="588" font-family="Arial, sans-serif" font-size="17" fill="#555f6b">selfbyt.com</text>
</svg>`;
await mkdir(`${root}/public/og`, { recursive: true });
await writeFile(`${root}/public/og/selfbyt.svg`, svg);
await sharp(Buffer.from(svg)).png().toFile(`${root}/public/og/selfbyt.png`);
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><rect width="180" height="180" fill="${paper}"/><circle cx="53" cy="90" r="28" fill="none" stroke="${blue}" stroke-width="8"/><circle cx="128" cy="90" r="32" fill="${blue}"/></svg>`;
await sharp(Buffer.from(icon)).png().toFile(`${root}/public/apple-touch-icon.png`);
console.log("Generated share image (1200x630) and Apple touch icon (180x180).");
