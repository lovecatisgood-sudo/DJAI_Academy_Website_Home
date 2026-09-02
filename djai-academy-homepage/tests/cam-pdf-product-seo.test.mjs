import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../app/Cam_PDF_Scan_Signer_QR-Gen/page.jsx", import.meta.url),
  "utf8"
);

test("Cam PDF owns the Android scanner, signer, and QR intent", () => {
  assert.match(
    pageSource,
    /title:\s*"PDF Scanner App for Android: Scan, Sign & Create QR Codes \| Cam PDF"/
  );
  assert.match(
    pageSource,
    /<h1[^>]*>\s*Scan documents, sign PDFs, and create QR codes on Android\s*<\/h1>/
  );
  assert.match(pageSource, /installUrl:\s*PLAY_STORE_URL/);
  assert.match(pageSource, /softwareVersion:\s*"2\.0\.1"/);
});

test("all product-page Play Store calls to action use the privacy-safe event contract", () => {
  const playCtaCount = [...pageSource.matchAll(/eventName="play_store_click"/g)].length;

  assert.equal(playCtaCount, 2);
  assert.match(pageSource, /source_path:\s*APP_PATH/);
  assert.match(pageSource, /locale:\s*"en"/);
  assert.match(pageSource, /cluster:\s*"cam_pdf"/);
  assert.match(pageSource, /destination_type:\s*"google_play"/);
  assert.match(pageSource, /destination_url:\s*PLAY_STORE_URL/);
  assert.doesNotMatch(pageSource, /<a[^>]+href=\{PLAY_STORE_URL\}/);
});

test("access conditions are visible and unsupported roadmap copy is absent", () => {
  assert.match(pageSource, /account is required/i);
  assert.match(pageSource, /weekly export allowance/i);
  assert.match(pageSource, /rewarded ads/i);
  assert.match(pageSource, /contains ads and in-app purchases/i);
  assert.match(pageSource, /no added watermark/i);
  assert.doesNotMatch(pageSource, /iOS release is planned|iOS.*coming soon|unlimited free/i);
});

test("verification date and current Google Play release are explicit", () => {
  assert.match(pageSource, /Verified against the Google Play listing and DJAI app policy on September 2, 2026\./);
  assert.match(pageSource, /Version 2\.0\.1/);
  assert.match(pageSource, /Updated August 23, 2026/);
});
