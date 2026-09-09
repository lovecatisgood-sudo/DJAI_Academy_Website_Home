import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = join(import.meta.dirname, "../..");
const appRoot = join(root, "djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen");
const publicRoot = join(root, "djai-academy-homepage/public");
const sitemap = readFileSync(join(root, "djai-academy-homepage/app/sitemap.js"), "utf8");
const hub = readFileSync(join(appRoot, "guides/page.jsx"), "utf8");
const product = readFileSync(join(appRoot, "page.jsx"), "utf8");
const guideRoutes = readFileSync(join(appRoot, "guides/guideRoutes.js"), "utf8");
const guideShell = readFileSync(join(appRoot, "guides/CamPdfGuideArticle.jsx"), "utf8");
const localizedShell = readFileSync(join(appRoot, "guides/LocalizedWorkflowGuideArticle.jsx"), "utf8");
const localizedHub = readFileSync(join(appRoot, "guides/LocalizedGuideHub.jsx"), "utf8");

const guides = [
  {
    file: "guides/scan-multiple-pages-to-pdf-android/page.jsx",
    route: "/Cam_PDF_Scan_Signer_QR-Gen/guides/scan-multiple-pages-to-pdf-android/",
    image: "apps/cam-pdf/guides/multi-page-scan-hero.png",
    phrase: /scan multiple pages into one PDF/i
  },
  {
    file: "guides/share-pdf-with-qr-code/page.jsx",
    route: "/Cam_PDF_Scan_Signer_QR-Gen/guides/share-pdf-with-qr-code/",
    image: "apps/cam-pdf/guides/pdf-qr-code-hero.png",
    phrase: /QR code for a PDF/i
  },
  {
    file: "guides/scan-sign-send-pdf-android/page.jsx",
    route: "/Cam_PDF_Scan_Signer_QR-Gen/guides/scan-sign-send-pdf-android/",
    image: "apps/cam-pdf/guides/scan-sign-send-hero.png",
    phrase: /scan, sign, and send a PDF/i
  }
];

test("each Cam PDF workflow guide has a distinct canonical, article schema, and H1 promise", () => {
  for (const guide of guides) {
    const source = readFileSync(join(appRoot, guide.file), "utf8");
    assert.match(source, guide.phrase, guide.file);
    assert.match(source, /alternates:\s*\{\s*canonical:/, guide.file);
    assert.match(source, /"@type": "Article"/, guide.file);
    assert.match(source, /"@type": "BreadcrumbList"/, guide.file);
    assert.match(source, /title="How to /, guide.file);
    const slug = guide.route.split("/").filter(Boolean).at(-1);
    assert.match(guideRoutes, new RegExp(slug));
  }
  assert.match(guideShell, /play_store_click/);
  assert.match(guideShell, /com\.djai\.campdfscan/);
  assert.match(guideShell, /application\/ld\+json/);
  for (const guide of guides) {
    const source = readFileSync(join(appRoot, guide.file), "utf8");
    assert.match(source, /structuredData=\{structuredData\}/, guide.file);
  }
  assert.equal(new Set(guides.map((guide) => guide.route)).size, guides.length);
});

test("the workflow guides use generated visuals and the files are shipped with the site", () => {
  for (const guide of guides) {
    const source = readFileSync(join(appRoot, guide.file), "utf8");
    assert.match(source, new RegExp(guide.image.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), guide.file);
    assert.equal(existsSync(join(publicRoot, guide.image)), true, guide.image);
  }
});

test("workflow guide links reinforce the Cam PDF product journey without reusing the watermark URL", () => {
  for (const guide of guides) {
    const source = readFileSync(join(appRoot, guide.file), "utf8");
    assert.match(source, /guideArticlePaths\.watermark/, guide.file);
  }
  assert.match(guideShell, /href=\{APP_PATH\}/);
  assert.match(guideShell, /href=\{GUIDES_PATH\}/);
  assert.match(hub, /guideArticlePaths\.multiPage/);
  assert.match(hub, /guideArticlePaths\.pdfQr/);
  assert.match(hub, /guideArticlePaths\.scanSign/);
  assert.match(product, /scan-multiple-pages-to-pdf-android/);
  assert.match(product, /share-pdf-with-qr-code/);
  assert.match(product, /scan-sign-send-pdf-android/);
});

test("all workflow URLs and their approved localized equivalents are in the canonical sitemap", () => {
  for (const guide of guides) {
    assert.match(sitemap, new RegExp(guide.route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const locale of ["th", "vi", "zh-cn", "zh-tw"]) {
    for (const guide of guides) {
      const localizedRoute = guide.route.replace("/guides/", `/guides/${locale}/`);
      const localizedFile = join(appRoot, localizedRoute.replace("/Cam_PDF_Scan_Signer_QR-Gen/", "").replace(/\/$/, ""), "page.jsx");
      assert.equal(existsSync(localizedFile), true, localizedFile);
      assert.match(sitemap, new RegExp(localizedRoute.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  }
  assert.doesNotMatch(sitemap, /guides\/en\/(?:scan-multiple-pages|share-pdf-with-qr|scan-sign-send)/);
  assert.match(guideRoutes, /workflowGuideLanguageHrefs/);
  assert.match(localizedShell, /inLanguage: locale/);
  assert.match(localizedShell, /play_store_click/);
  assert.match(localizedHub, /workflowGuidePaths/);
});

test("QR guide states the link-first limitation instead of claiming PDF hosting", () => {
  const source = readFileSync(join(appRoot, guides[1].file), "utf8");
  assert.match(source, /does not host the PDF/i);
  assert.match(source, /website QR/i);
  assert.match(source, /Adobe.*PDF-to-QR|PDF-to-QR.*Adobe/i);
});

test("signing guide distinguishes a signature annotation from a certificate-based signature", () => {
  const source = readFileSync(join(appRoot, guides[2].file), "utf8");
  assert.match(source, /signature annotation/i);
  assert.match(source, /certificate-based/i);
});
