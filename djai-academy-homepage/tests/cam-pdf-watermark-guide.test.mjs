import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL(
  "../app/Cam_PDF_Scan_Signer_QR-Gen/guides/remove-camscanner-watermark-free/page.jsx",
  import.meta.url
);
const hubUrl = new URL("../app/Cam_PDF_Scan_Signer_QR-Gen/guides/page.jsx", import.meta.url);
const productUrl = new URL("../app/Cam_PDF_Scan_Signer_QR-Gen/page.jsx", import.meta.url);
const sitemapUrl = new URL("../app/sitemap.js", import.meta.url);

async function readSource(url) {
  try {
    return await readFile(url, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

test("Cam PDF watermark guide owns the removal intent with an honest answer", async () => {
  const source = await readSource(pageUrl);

  assert.match(source, /How to Remove the CamScanner Watermark for Free/);
  assert.match(source, /no universal free in-app method/i);
  assert.match(source, /version, region, and plan/i);
  assert.match(source, /rescan the original/i);
  assert.match(source, /mod APK/i);
});

test("guide presents a sourced and fair scanner-app comparison", async () => {
  const source = await readSource(pageUrl);

  for (const product of ["CamScanner", "SwiftScan", "TapScanner", "iScanner", "Cam PDF"]) {
    assert.match(source, new RegExp(product));
  }
  assert.match(source, /DJAI product/i);
  assert.match(source, /checked September 7, 2026/i);
  assert.match(source, /official product and support information/i);
});

test("guide is cross-platform without publishing a placeholder App Store link", async () => {
  const source = await readSource(pageUrl);

  assert.match(source, /Android and iPhone/i);
  assert.match(source, /com\.djai\.campdfscan/);
  assert.doesNotMatch(source, /apps\.apple\.com[^\"]*campdf/i);
});

test("guide route is discoverable from its hub, product page, and sitemap", async () => {
  const [guide, hub, product, sitemap] = await Promise.all([
    readSource(pageUrl),
    readSource(hubUrl),
    readSource(productUrl),
    readSource(sitemapUrl)
  ]);

  const route = "/Cam_PDF_Scan_Signer_QR-Gen/guides/remove-camscanner-watermark-free/";
  assert.match(guide, /BreadcrumbList/);
  assert.match(guide, /Article/);
  assert.ok(hub.includes(route));
  assert.ok(product.includes("/Cam_PDF_Scan_Signer_QR-Gen/guides/"));
  assert.ok(sitemap.includes(route));
});

test("guide uses original editorial images and real Cam PDF product evidence", async () => {
  const source = await readSource(pageUrl);

  assert.match(source, /watermark-guide-hero\.webp/);
  assert.match(source, /rescan-original-document\.webp/);
  assert.match(source, /\/apps\/cam-pdf\/export\.png/);
});
