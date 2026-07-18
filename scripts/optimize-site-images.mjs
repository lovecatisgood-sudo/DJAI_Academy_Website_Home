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

const assets = [
  ["djai-academy-homepage/public/djai-logo.webp", "djai-academy-homepage/public/djai-logo-display.webp", 600, 70],
  ["djai-academy-homepage/public/djai-logo.webp", "djai-academy-homepage/public/djai-logo-small.webp", 200, 70],
  ["djai-academy-homepage/public/founder-djai.webp", "djai-academy-homepage/public/founder-djai-display.webp", 912, 74],
  ["djai-academy-homepage/public/founder-djai.webp", "djai-academy-homepage/public/founder-djai-mobile.webp", 640, 74],
  ["djai-academy-course/public/assets/DJAI-logo.webp", "djai-academy-course/public/assets/DJAI-logo-display.webp", 768, 72],
  ["djai-academy-course/public/assets/DJAI-logo.webp", "djai-academy-course/public/assets/DJAI-logo-small.webp", 200, 70],
  ["djai-academy-course/public/assets/Instructor-DJAI.webp", "djai-academy-course/public/assets/Instructor-DJAI-display.webp", 800, 74],
  ["DJayTools-Free-QR-Generator-Source/public/djai-academy-logo.webp", "DJayTools-Free-QR-Generator-Source/public/djai-academy-logo-display.webp", 384, 72],
  ["DJayTools-Free-QR-Generator-Source/public/siamese-cat-dev-logo.png", "DJayTools-Free-QR-Generator-Source/public/siamese-cat-dev-logo.webp", 900, 78],
  ["djai-pdf-tools/public/djai-academy-logo.webp", "djai-pdf-tools/public/djai-academy-logo-display.webp", 384, 72],
  ["djai-pdf-tools/public/djai-academy-logo.webp", "djai-pdf-tools/public/djai-academy-logo-small.webp", 192, 70],
  ["djai-pdf-tools/public/siamese-cat-dev-logo.png", "djai-pdf-tools/public/siamese-cat-dev-logo.webp", 900, 78],
  ["djai-image-resizer/public/assets/djai-academy-logo.png", "djai-image-resizer/public/assets/djai-academy-logo.webp", 384, 72],
  ["djai-image-resizer/public/assets/siamese-cat-dev-transparent.png", "djai-image-resizer/public/assets/siamese-cat-dev-transparent.webp", 900, 78],
  ["Siamese-Cat-Dev-Bio-Site/public/djai-academy-logo.png", "Siamese-Cat-Dev-Bio-Site/public/djai-academy-logo.webp", 640, 74],
  ["Siamese-Cat-Dev-Bio-Site/public/siamese-cat-dev-logo.png", "Siamese-Cat-Dev-Bio-Site/public/siamese-cat-dev-logo.webp", 900, 78],
  ["Siamese-Cat-Dev-Bio-Site/public/siamese-cat-dev-character.png", "Siamese-Cat-Dev-Bio-Site/public/siamese-cat-dev-character.webp", 800, 78],
  ["Siamese-Cat-Dev-Bio-Site/public/siamese-cat-dev-wordmark.png", "Siamese-Cat-Dev-Bio-Site/public/siamese-cat-dev-wordmark.webp", 720, 78]
];

for (const [source, target, width, quality] of assets) {
  await writeWebp(join(root, source), join(root, target), width, quality);
}

const portfolioSource = join(root, "djai-academy-homepage/public/portfolio");
const portfolioTarget = join(portfolioSource, "optimized");
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
