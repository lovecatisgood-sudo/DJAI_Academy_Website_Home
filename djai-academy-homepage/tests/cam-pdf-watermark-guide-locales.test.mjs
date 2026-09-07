import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const appRoot = new URL("../app/", import.meta.url);

async function source(path) {
  try {
    return await readFile(new URL(path, appRoot), "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

const localeRoutes = [
  ["th", "th", "วิธีลบลายน้ำ CamScanner ฟรี"],
  ["vi", "vi", "Cách xóa watermark CamScanner miễn phí"],
  ["zh-cn", "zh-CN", "扫描全能王去水印"],
  ["zh-tw", "zh-TW", "CamScanner 去浮水印"]
];

test("localized Cam PDF guide routes use the correct locale and shared editorial template", async () => {
  for (const [segment, locale, phrase] of localeRoutes) {
    const page = await source(
      `Cam_PDF_Scan_Signer_QR-Gen/guides/${segment}/remove-camscanner-watermark-free/page.jsx`
    );
    assert.match(page, /LocalizedWatermarkGuidePage/);
    assert.ok(page.includes(`locale=\"${locale}\"`));
    assert.ok(page.includes(phrase));
    assert.match(page, /generateLocalizedMetadata/);
  }
});

test("localized guide hubs exist and own their self-canonical routes", async () => {
  for (const [segment, locale] of localeRoutes) {
    const page = await source(`Cam_PDF_Scan_Signer_QR-Gen/guides/${segment}/page.jsx`);
    assert.match(page, /LocalizedGuideHub/);
    assert.ok(page.includes(`locale=\"${locale}\"`));
    assert.match(page, /generateLocalizedHubMetadata/);
  }
});

test("all guide equivalents expose reciprocal language destinations", async () => {
  const routes = await source("Cam_PDF_Scan_Signer_QR-Gen/guides/guideRoutes.js");

  for (const [segment] of localeRoutes) {
    assert.ok(routes.includes(`/guides/${segment}/remove-camscanner-watermark-free/`));
    assert.ok(routes.includes(`/guides/${segment}/`));
  }
  for (const language of ["en", "th", "vi", "zh-CN", "zh-TW", "x-default"]) {
    assert.ok(routes.includes(`\"${language}\"`));
  }
});

test("localized content keeps verified product limits and does not invent an App Store URL", async () => {
  const [content, english] = await Promise.all([
    source("Cam_PDF_Scan_Signer_QR-Gen/guides/localizedWatermarkGuideContent.js"),
    source("Cam_PDF_Scan_Signer_QR-Gen/guides/remove-camscanner-watermark-free/page.jsx")
  ]);

  assert.match(english, /weekly export allowance/);
  assert.match(content, /โควตาการส่งออกรายสัปดาห์/);
  assert.match(content, /giới hạn xuất tệp hằng tuần/);
  assert.match(content, /每周导出额度/);
  assert.match(content, /每週匯出額度/);
  assert.doesNotMatch(content, /apps\.apple\.com[^\"]*campdf/i);
});

test("sitemap, runtime locale detection, and Hostinger audit include every localized guide", async () => {
  const [sitemap, i18n, audit] = await Promise.all([
    source("sitemap.js"),
    source("lib/i18n.js"),
    readFile(new URL("../../scripts/audit-hostinger.mjs", import.meta.url), "utf8")
  ]);

  assert.match(i18n, /guides\/th/);
  for (const [segment] of localeRoutes) {
    const route = `/Cam_PDF_Scan_Signer_QR-Gen/guides/${segment}/remove-camscanner-watermark-free/`;
    assert.ok(sitemap.includes(route));
    assert.ok(audit.includes(route));
  }
});
