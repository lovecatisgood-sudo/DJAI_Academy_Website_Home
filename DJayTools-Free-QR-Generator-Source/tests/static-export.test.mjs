import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const basePath = "/tools/qrgen";

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

test("Hostinger static export uses the configured subpath", async () => {
  const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");
  const englishHtml = await readFile(new URL("../out/en/index.html", import.meta.url), "utf8");

  assert.match(html, new RegExp(`${basePath}/_next/static`));
  assert.match(html, new RegExp(`${basePath}/djai-academy-logo\\.webp`));
  assert.match(html, new RegExp(`${basePath}/djai-academy-logo-display\\.webp`));
  assert.match(html, new RegExp(`${basePath}/siamese-cat-dev-logo\\.webp`));
  assert.doesNotMatch(html, /src="\/(?:djai-academy-logo|siamese-cat-dev-logo)/);
  assert.match(html, /<html lang="th">/);
  assert.match(englishHtml, /<html lang="en">/);
  assert.match(englishHtml, /Free QR Code Generator/);

  assert.equal(await exists(new URL("../out/djai-academy-logo.webp", import.meta.url)), true);
  assert.equal(await exists(new URL("../out/djai-academy-logo-display.webp", import.meta.url)), true);
  assert.equal(await exists(new URL("../out/siamese-cat-dev-logo.webp", import.meta.url)), true);
});

test("exports bilingual task pages with unique metadata", async () => {
  const slugs = ["url-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator", "text-qr-code-generator", "email-qr-code-generator", "whatsapp-qr-code-generator", "qr-code-generator-with-logo"];
  for (const slug of slugs) {
    const thai = await readFile(new URL(`../out/${slug}/index.html`, import.meta.url), "utf8");
    const english = await readFile(new URL(`../out/${slug}/en/index.html`, import.meta.url), "utf8");
    assert.match(thai, new RegExp(`<link rel="canonical" href="https://www.djai.academy${basePath}/${slug}/"`));
    assert.match(english, new RegExp(`<link rel="canonical" href="https://www.djai.academy${basePath}/${slug}/en/"`));
    assert.match(english, /<html lang="en">/);
    assert.match(thai, /hrefLang="en"/);
    assert.match(english, /hrefLang="th"/);
  }
});

test("the URL task owns link-to-QR intent without a pre-success Cam promotion", async () => {
  const thai = await readFile(new URL("../out/url-qr-code-generator/index.html", import.meta.url), "utf8");
  const english = await readFile(new URL("../out/url-qr-code-generator/en/index.html", import.meta.url), "utf8");

  assert.match(thai, /<h1>สร้าง QR Code จากลิงก์ฟรี<\/h1>/);
  assert.match(thai, /ดาวน์โหลด PNG หรือ SVG โดยไม่ต้องสมัคร/);
  assert.match(english, /<h1>Free URL QR Code Generator<\/h1>/);
  assert.doesNotMatch(thai, /ดาวน์โหลดจาก Google Play/);
  assert.doesNotMatch(english, /Download on Google Play/);
});

test("exports independently localized Chinese hubs and all seven task pages", async () => {
  const simplifiedHub = await readFile(new URL("../out/zh-cn/index.html", import.meta.url), "utf8");
  const traditionalHub = await readFile(new URL("../out/zh-tw/index.html", import.meta.url), "utf8");
  assert.match(simplifiedHub, /<html lang="zh-CN">/);
  assert.match(traditionalHub, /<html lang="zh-TW">/);
  assert.match(simplifiedHub, /免费二维码生成器/);
  assert.match(traditionalHub, /免費 QR Code 產生器/);
  assert.doesNotMatch(simplifiedHub, /สร้าง QR|Tạo mã/);
  assert.doesNotMatch(traditionalHub, /สร้าง QR|Tạo mã/);

  for (const slug of ["url-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator", "text-qr-code-generator", "email-qr-code-generator", "whatsapp-qr-code-generator", "qr-code-generator-with-logo"]) {
    for (const [segment, locale] of [["zh-cn", "zh-CN"], ["zh-tw", "zh-TW"]]) {
      const html = await readFile(new URL(`../out/${slug}/${segment}/index.html`, import.meta.url), "utf8");
      assert.match(html, new RegExp(`<html lang="${locale}">`));
      assert.match(html, new RegExp(`<link rel="canonical" href="https://www.djai.academy${basePath}/${slug}/${segment}/"`));
      assert.match(html, /name="robots" content="noindex, follow"/);
    }
  }
});
