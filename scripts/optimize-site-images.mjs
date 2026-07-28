import { mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { createRequire } from "node:module";

const root = new URL("../", import.meta.url).pathname;
const requireFromHomepage = createRequire(new URL("../djai-academy-homepage/package.json", import.meta.url));
const sharp = requireFromHomepage("sharp");

async function writeWebp(source, target, width, quality = 76) {
  mkdirSync(dirname(target), { recursive: true });
  await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, alphaQuality: 86, effort: 6, smartSubsample: true })
    .toFile(target);
}

async function writeSocialCard(target, eyebrow, title, accent) {
  mkdirSync(dirname(target), { recursive: true });
  const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#061941"/><stop offset="1" stop-color="#102f72"/></linearGradient></defs>
    <rect width="1200" height="630" rx="36" fill="url(#bg)"/>
    <circle cx="1040" cy="80" r="280" fill="${accent}" opacity=".18"/><circle cx="1080" cy="600" r="230" fill="#18c8ee" opacity=".12"/>
    <text x="86" y="145" fill="${accent}" font-family="Arial,sans-serif" font-size="30" font-weight="700" letter-spacing="5">${eyebrow}</text>
    <text x="86" y="285" fill="white" font-family="Arial,sans-serif" font-size="72" font-weight="800">${title}</text>
    <text x="86" y="380" fill="#c8d7ef" font-family="Arial,sans-serif" font-size="34">Learn · Build · Deploy</text>
    <rect x="86" y="475" width="360" height="64" rx="18" fill="${accent}"/><text x="124" y="518" fill="#061941" font-family="Arial,sans-serif" font-size="27" font-weight="800">DJAI ACADEMY</text>
  </svg>`);
  await sharp(svg).webp({ quality: 84, effort: 6 }).toFile(target);
}

const assets = [
  ["djai-academy-homepage/public/djai-logo.webp", "djai-academy-homepage/public/djai-logo-display.webp", 600, 70],
  ["djai-academy-homepage/public/djai-logo.webp", "djai-academy-homepage/public/djai-logo-small.webp", 200, 70],
  ["djai-academy-homepage/public/founder-djai.webp", "djai-academy-homepage/public/founder-djai-display.webp", 912, 74],
  ["djai-academy-homepage/public/founder-djai.webp", "djai-academy-homepage/public/founder-djai-mobile.webp", 640, 74],
  ["djai-academy-course/public/assets/DJAI-logo.webp", "djai-academy-course/public/assets/DJAI-logo-display.webp", 768, 72],
  ["djai-academy-course/public/assets/DJAI-logo.webp", "djai-academy-course/public/assets/DJAI-logo-small.webp", 200, 70],
  ["djai-academy-course/public/assets/Instructor-DJAI.webp", "djai-academy-course/public/assets/Instructor-DJAI-display.webp", 800, 74],
  ["djai-academy-course/source-assets/community1.webp", "djai-academy-course/public/assets/community1-display.webp", 900, 68],
  ["djai-academy-course/source-assets/community2.webp", "djai-academy-course/public/assets/community2-display.webp", 900, 68],
  ["djai-academy-course/source-assets/community3.webp", "djai-academy-course/public/assets/community3-display.webp", 900, 68],
  ["djai-academy-course/source-assets/community4.webp", "djai-academy-course/public/assets/community4-display.webp", 900, 68],
  ["djai-academy-course/source-assets/community5.webp", "djai-academy-course/public/assets/community5-display.webp", 900, 68],
  ["djai-academy-course/source-assets/community6.webp", "djai-academy-course/public/assets/community6-display.webp", 900, 68],
  ["djai-academy-course/source-assets/community7.webp", "djai-academy-course/public/assets/community7-display.webp", 900, 68],
  ["djai-academy-course/source-assets/community8.webp", "djai-academy-course/public/assets/community8-display.webp", 900, 68],
  ["djai-academy-course/source-assets/719233138_122103496575327302_5083318908732239582_n.webp", "djai-academy-course/public/assets/mobile-app-display.webp", 620, 68],
  ["DJayTools-Free-QR-Generator-Source/public/djai-academy-logo.webp", "DJayTools-Free-QR-Generator-Source/public/djai-academy-logo-display.webp", 384, 72],
  ["DJayTools-Free-QR-Generator-Source/source-assets/siamese-cat-dev-logo.png", "DJayTools-Free-QR-Generator-Source/public/siamese-cat-dev-logo.webp", 900, 78],
  ["djai-pdf-tools/public/djai-academy-logo.webp", "djai-pdf-tools/public/djai-academy-logo-display.webp", 384, 72],
  ["djai-pdf-tools/public/djai-academy-logo.webp", "djai-pdf-tools/public/djai-academy-logo-small.webp", 192, 70],
  ["djai-pdf-tools/source-assets/siamese-cat-dev-logo.png", "djai-pdf-tools/public/siamese-cat-dev-logo.webp", 900, 78],
  ["djai-image-resizer/source-assets/djai-academy-logo.png", "djai-image-resizer/public/assets/djai-academy-logo.webp", 384, 72],
  ["djai-image-resizer/source-assets/siamese-cat-dev-transparent.png", "djai-image-resizer/public/assets/siamese-cat-dev-transparent.webp", 900, 78],
  ["djai-image-resizer/source-assets/siamese-cat-mascot.png", "djai-image-resizer/public/assets/siamese-cat-mascot.webp", 660, 76],
  ["Siamese-Cat-Dev-Bio-Site/source-assets/djai-academy-logo.png", "Siamese-Cat-Dev-Bio-Site/public/djai-academy-logo.webp", 640, 74],
  ["Siamese-Cat-Dev-Bio-Site/source-assets/siamese-cat-dev-logo.png", "Siamese-Cat-Dev-Bio-Site/public/siamese-cat-dev-logo.webp", 900, 78],
  ["Siamese-Cat-Dev-Bio-Site/source-assets/siamese-cat-dev-character.png", "Siamese-Cat-Dev-Bio-Site/public/siamese-cat-dev-character.webp", 800, 78],
  ["Siamese-Cat-Dev-Bio-Site/source-assets/siamese-cat-dev-wordmark.png", "Siamese-Cat-Dev-Bio-Site/public/siamese-cat-dev-wordmark.webp", 720, 78]
];

for (const [source, target, width, quality] of assets) {
  await writeWebp(join(root, source), join(root, target), width, quality);
}

await Promise.all([
  writeSocialCard(join(root, "djai-academy-homepage/public/social/djai-academy.webp"), "EDUCATE · BUILD · DEPLOY", "AI into real products", "#18c8ee"),
  writeSocialCard(join(root, "djai-academy-homepage/public/social/djai-blog.webp"), "GUIDES &amp; TUTORIALS", "Build better with AI", "#9d7bff"),
  writeSocialCard(join(root, "djai-academy-homepage/public/social/djai-tools.webp"), "FREE PRIVATE TOOLS", "Work faster in your browser", "#ffb35c"),
  writeSocialCard(join(root, "djai-academy-homepage/public/social/djai-development.webp"), "PROFESSIONAL DEVELOPMENT", "From idea to production", "#18c8ee")
]);

const portfolioSource = join(root, "djai-academy-homepage/source-assets/portfolio");
const portfolioTarget = join(root, "djai-academy-homepage/public/portfolio/optimized");
for (const category of readdirSync(portfolioSource)) {
  const categoryPath = join(portfolioSource, category);
  if (category === "optimized" || !statSync(categoryPath).isDirectory()) continue;
  for (const name of readdirSync(categoryPath)) {
    if (!/[.](png|jpe?g|webp)$/i.test(name)) continue;
    const output = join(portfolioTarget, category, `${basename(name, extname(name))}.webp`);
    await writeWebp(join(categoryPath, name), output, 1200, 76);
  }
}

console.log("Optimized display and portfolio images generated.");
