const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const mediaTools = JSON.parse(
  readFileSync(path.join(root, "djai-media-tools/src/video-tools-config.json"), "utf8"),
);
const imageSource = readFileSync(
  path.join(root, "djai-image-resizer/scripts/generate-seo-pages.mjs"),
  "utf8",
);
const qrSource = readFileSync(
  path.join(root, "DJayTools-Free-QR-Generator-Source/app/qr-tool-data.ts"),
  "utf8",
);
const faviconSource = readFileSync(
  path.join(root, "djai-document-tools/app/brand/favicon-generator/en/page.tsx"),
  "utf8",
);
const hubSource = readFileSync(
  path.join(root, "djai-academy-homepage/app/tools/en/page.jsx"),
  "utf8",
);
const ownership = JSON.parse(
  readFileSync(path.join(root, "data/seo/keyword-ownership.json"), "utf8"),
);
const inventory = JSON.parse(
  readFileSync(path.join(root, "audits/site-restructure/public-route-inventory.json"), "utf8"),
);

function media(slug) {
  const tool = mediaTools.find((entry) => entry.slug === slug);
  assert.ok(tool, `missing media tool ${slug}`);
  return tool.en;
}

test("priority English media pages expose specific, honest search copy", () => {
  assert.equal(media("gif-to-mp4").title, "GIF to MP4 Converter Free — No Upload | DJAI");
  assert.match(media("gif-to-mp4").meta, /no upload, account, or watermark/i);

  assert.equal(media("video-cropper").title, "Crop Video Online Free — 16:9, 9:16, 1:1 | DJAI");
  assert.match(media("video-cropper").meta, /centered MP4 crop/i);

  assert.equal(media("video-resizer").title, "Resize Video Online Free — 1080p, 720p, 480p | DJAI");
  assert.match(media("video-resizer").meta, /preserving aspect ratio/i);

  assert.equal(media("extract-frames-from-video").title, "Extract Video Frames at Intervals — JPG or PNG | DJAI");
  assert.match(media("extract-frames-from-video").meta, /up to 100 images/i);

  for (const size of [10, 25, 50, 100]) {
    const copy = media(`compress-video-to-${size}mb`);
    assert.equal(copy.title, `Compress Video Toward ${size} MB Free — No Upload | DJAI`);
    assert.match(copy.meta, /target is approximate/i);
    assert.match(copy.meta, /no upload or account/i);
  }
});

test("English image, email QR, and favicon snippets lead with verified differentiators", () => {
  assert.match(imageSource, /The 100 KB result is approximate; check the actual size before download\./);
  assert.match(imageSource, /The 200 KB result is approximate; check the actual size before download\./);
  assert.match(imageSource, /The 500 KB result is approximate; check the actual size before download\./);

  assert.match(qrSource, /Create a static email QR code with recipient, subject, and optional message prefilled\./);
  assert.match(qrSource, /download PNG or SVG free with no sign-up/);

  assert.match(faviconSource, /Free Favicon Generator — ICO, Apple & PWA Icon ZIP \| DJAI/);
  assert.match(faviconSource, /multi-size ICO, Apple touch, PWA and maskable icons, web manifest, and HTML/);
});

test("the English hub directly links every proven-opportunity workflow", () => {
  const priorityRoutes = [
    "/tools/media/gif-to-mp4/en/",
    "/tools/media/compress-video-to-10mb/en/",
    "/tools/media/compress-video-to-25mb/en/",
    "/tools/media/compress-video-to-50mb/en/",
    "/tools/media/compress-video-to-100mb/en/",
    "/tools/media/video-cropper/en/",
    "/tools/media/video-resizer/en/",
    "/tools/media/extract-frames-from-video/en/",
    "/tools/resizeimg/resize-image-to-200kb/en/",
    "/tools/qrgen/email-qr-code-generator/en/",
    "/tools/brand/favicon-generator/en/",
  ];
  for (const route of priorityRoutes) {
    assert.match(hubSource, new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(hubSource, /90\+ free tools/);
  assert.match(hubSource, /No account required; many files process privately in your browser\./);
});

test("all rendered English tool snippets are unique and useful at search-result length", () => {
  const routes = new Set(
    ownership.entries
      .filter((row) => row.locale === "en" && row.indexable && row.pageRole === "working_tool")
      .map((row) => row.route),
  );
  const rows = inventory.routes.filter((row) => routes.has(row.route));
  assert.equal(rows.length, 92, "rendered inventory must cover every English tool");
  assert.equal(new Set(rows.map((row) => row.title)).size, rows.length, "duplicate English tool title");
  assert.equal(
    new Set(rows.map((row) => row.description)).size,
    rows.length,
    "duplicate English tool description",
  );
  for (const row of rows) {
    assert.ok(row.title.length <= 65, `${row.route}: title exceeds 65 characters`);
    assert.ok(row.description.length >= 70, `${row.route}: description is too terse`);
    assert.ok(row.description.length <= 170, `${row.route}: description exceeds 170 characters`);
    assert.equal(row.canonical, `https://www.djai.academy${row.route}`, `${row.route}: canonical`);
  }
});

test("remaining English tool snippets expose their useful long-tail distinctions", () => {
  assert.match(qrSource, /URL or website link[^\n]+no sign-up/i);
  assert.match(qrSource, /vCard QR code[^\n]+business cards/i);

  assert.match(imageSource, /WebP to PNG[^\n]+preserving transparency/i);
  assert.match(imageSource, /Remove the background[^\n]+without uploading/i);

  const pdfSource = readFileSync(
    path.join(root, "djai-pdf-tools/app/seo-alias-data.ts"),
    "utf8",
  );
  assert.match(pdfSource, /Convert PDF pages to lossless PNG images[^\n]+ZIP/i);

  const documentSource = readFileSync(
    path.join(root, "djai-document-tools/app/tool-data.ts"),
    "utf8",
  );
  assert.match(documentSource, /Convert Word DOCX files to PDF[^\n]+without uploading/i);
  assert.match(documentSource, /Extract plain text from Word documents[^\n]+without uploading/i);
  assert.match(documentSource, /Extract PDF into clean Markdown[^\n]+RAG/i);

  const mediaBuildSource = readFileSync(
    path.join(root, "djai-media-tools/scripts/build.mjs"),
    "utf8",
  );
  for (const pair of ["MP3 audio to WAV", "WAV audio to MP3", "M4A audio to MP3"]) {
    assert.match(
      mediaBuildSource,
      new RegExp(`${pair}[^\\n]+without upload`, "i"),
      `${pair}: missing no-upload distinction`,
    );
  }
  assert.match(media("mov-to-mp4").meta, /without upload/i);
  assert.match(media("compress-video").meta, /MP4, MOV, or WebM/i);
  assert.match(media("compress-video").meta, /target size/i);
});

test("organize PDF and visual reorder PDF keep separate search intent", () => {
  const organize = ownership.entries.find(
    (row) => row.route === "/tools/PDFTools/organize-pdf/en/",
  );
  const reorder = ownership.entries.find(
    (row) => row.route === "/tools/PDFTools/reorder-pdf-pages/en/",
  );
  assert.ok(organize);
  assert.ok(reorder);
  assert.equal(organize.primaryQueryFamily, "reorder and delete PDF pages by page number");
  assert.equal(reorder.primaryQueryFamily, "reorder PDF pages by dragging in browser");
});
