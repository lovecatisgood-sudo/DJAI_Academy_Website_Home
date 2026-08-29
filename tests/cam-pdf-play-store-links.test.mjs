import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { camPdfContent } from "../djai-academy-homepage/app/lib/camPdfChineseContent.js";

const root = join(import.meta.dirname, "..");
const playUrl = "https://play.google.com/store/apps/details?id=com.djai.campdfscan";
const productRoot = "djai-academy-homepage/app/Cam_PDF_Scan_Signer_QR-Gen";

const downloadCtaFiles = [
  "DJayTools-Free-QR-Generator-Source/app/page.tsx",
  "DJayTools-Free-QR-Generator-Source/app/en/page.tsx",
  "djai-academy-homepage/app/tools/page.jsx",
  "djai-academy-homepage/app/tools/en/page.jsx",
  "djai-academy-homepage/app/portfolio/page.jsx",
  "djai-academy-homepage/app/portfolio/en/page.jsx",
  "djai-academy-homepage/app/portfolio/vi/page.jsx",
  "djai-document-tools/app/category-page.tsx",
  "djai-image-resizer/public/index.html",
  "djai-image-resizer/public/en/index.html",
  "djai-pdf-tools/app/PdfToolsApp.tsx"
];

test("existing Cam PDF download buttons use the published Google Play listing", () => {
  for (const relativePath of downloadCtaFiles) {
    const source = readFileSync(join(root, relativePath), "utf8");
    assert.match(source, new RegExp(playUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), relativePath);
  }
});

test("English product page advertises the live release and iOS follow-up", () => {
  const source = readFileSync(join(root, productRoot, "page.jsx"), "utf8");
  assert.match(source, /Available on Google Play/);
  assert.match(source, /Download on Google Play/);
  assert.match(source, /installUrl: PLAY_STORE_URL/);
  assert.match(source, /iOS release is planned/);
  assert.doesNotMatch(source, /release in progress|release is being prepared|Launch preparation underway/i);
});

test("Taiwan Cam PDF page uses the verified Play listing", () => {
  assert.equal(camPdfContent["zh-TW"].androidUrl, playUrl);
  assert.match(camPdfContent["zh-TW"].watermarkMessage, /免費版.*浮水印|無浮水印/);
  assert.equal(camPdfContent["zh-TW"].primaryDownload.kind, "play-store");
});

test("Mainland page explains availability without making Play its only primary action", () => {
  assert.equal(camPdfContent["zh-CN"].primaryDownload.kind, "availability-notice");
  assert.equal(camPdfContent["zh-CN"].androidUrl, playUrl);
  assert.match(camPdfContent["zh-CN"].primaryDownload.label, /中国大陆|访问/);
});

test("both market versions make only the supported release claims", () => {
  for (const locale of ["zh-CN", "zh-TW"]) {
    const content = camPdfContent[locale];
    assert.equal(content.indexable, false);
    assert.match(content.watermarkMessage, locale === "zh-CN" ? /免费版.*水印|无水印/ : /免費版.*浮水印|無浮水印/);
    assert.match(content.iosMessage, /iOS/);
    assert.equal(content.features.length, 6);
  }
});

test("product and review-gated legal routes exist for both Chinese markets", () => {
  for (const segment of ["zh-cn", "zh-tw"]) {
    for (const suffix of ["", "privacy", "terms", "delete-account"]) {
      const route = join(root, productRoot, segment, suffix, "page.jsx");
      assert.equal(existsSync(route), true, route);
      assert.match(readFileSync(route, "utf8"), /indexable: false|robots:\s*\{\s*index:\s*false/);
    }
  }
});

test("release article routes exist in both markets and link to the product and Play listing", () => {
  for (const segment of ["zh-cn", "zh-tw"]) {
    const route = join(root, `djai-academy-homepage/app/blog/${segment}/cam-pdf-scanner-app-google-play-release/page.jsx`);
    assert.equal(existsSync(route), true, route);
    const source = readFileSync(route, "utf8");
    assert.match(source, /camPdfReleaseArticles/);
    assert.match(source, /indexable: false/);
  }
});
