import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const publisherMeta = '<meta name="google-adsense-account" content="ca-pub-3624708289866566"';
const sellerRecord = "google.com, pub-3624708289866566, DIRECT, f08c47fec0942fa0";
const servingMarkers = [
  'class="adsbygoogle"',
  "pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
  "data-ad-slot="
];

function fail(message) {
  throw new Error(`[AdSense recovery] ${message}`);
}

function read(relativePath) {
  const absolutePath = join(rootDir, relativePath);
  if (!existsSync(absolutePath)) fail(`Missing required file: ${relativePath}`);
  return readFileSync(absolutePath, "utf8");
}

function htmlIndexFiles(directory) {
  const absoluteDirectory = join(rootDir, directory);
  if (!existsSync(absoluteDirectory)) fail(`Missing build output: ${directory}`);
  const results = [];
  const visit = (current) => {
    for (const entry of readdirSync(current)) {
      const absolutePath = join(current, entry);
      if (statSync(absolutePath).isDirectory()) visit(absolutePath);
      else if (entry === "index.html") results.push(absolutePath);
    }
  };
  visit(absoluteDirectory);
  return results;
}

const sourceChecks = [
  "djai-academy-homepage/app/layout.jsx",
  "djai-academy-homepage/app/components/AdSenseAd.jsx",
  "DJayTools-Free-QR-Generator-Source/app/layout.tsx",
  "DJayTools-Free-QR-Generator-Source/app/AdSenseAd.tsx",
  "djai-pdf-tools/app/layout.tsx",
  "djai-pdf-tools/app/AdSenseAd.tsx",
  "djai-document-tools/app/layout.tsx",
  "djai-document-tools/app/AdSenseAd.tsx"
];

for (const sourcePath of sourceChecks) {
  const source = read(sourcePath);
  for (const marker of servingMarkers) {
    if (source.includes(marker)) fail(`${sourcePath} still contains ad-serving marker: ${marker}`);
  }
}

for (const layoutPath of [
  "djai-academy-homepage/app/layout.jsx",
  "DJayTools-Free-QR-Generator-Source/app/layout.tsx",
  "djai-pdf-tools/app/layout.tsx",
  "djai-document-tools/app/layout.tsx"
]) {
  if (!read(layoutPath).includes('"google-adsense-account"')) {
    fail(`${layoutPath} lost the publisher ownership metadata`);
  }
}

const consentSource = read("djai-academy-homepage/app/components/ConsentManager.jsx");
if (!consentSource.includes('ad_storage: "denied"') || !consentSource.includes('ad_user_data: "denied"')) {
  fail("ConsentManager must keep advertising consent denied during recovery");
}

const adsTxt = read("djai-academy-homepage/public/ads.txt").trim();
if (adsTxt !== sellerRecord) fail("ads.txt no longer contains the exact authorized-seller record");

const outputRoots = [
  "DJayTools-Free-QR-Generator-Source/out",
  "djai-image-resizer/public",
  "djai-pdf-tools/out",
  "djai-media-tools/public",
  "djai-document-tools/out"
];

let checkedPages = 0;
for (const outputRoot of outputRoots) {
  const htmlFiles = htmlIndexFiles(outputRoot);
  if (htmlFiles.length === 0) fail(`No index pages found in ${outputRoot}`);
  for (const absolutePath of htmlFiles) {
    const html = readFileSync(absolutePath, "utf8");
    const displayPath = relative(rootDir, absolutePath);
    for (const marker of servingMarkers) {
      if (html.includes(marker)) fail(`${displayPath} still emits ad-serving marker: ${marker}`);
    }
    if (!html.includes(publisherMeta)) fail(`${displayPath} lost the publisher ownership meta tag`);
    checkedPages += 1;
  }
}

console.log(`AdSense approval recovery verified across ${checkedPages} static index pages.`);
