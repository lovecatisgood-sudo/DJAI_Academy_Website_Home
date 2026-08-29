import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const projectDir = new URL("..", import.meta.url).pathname;
const outDir = join(projectDir, "out");
const tools = ["merge-pdf", "split-pdf", "compress-pdf", "images-to-pdf", "pdf-to-images", "rotate-pdf", "watermark-pdf", "protect-pdf", "organize-pdf", "add-page-numbers", "remove-pdf-metadata", "jpg-to-pdf", "pdf-to-jpg", "png-to-pdf", "webp-to-pdf", "pdf-to-png", "extract-pdf-pages", "delete-pages-from-pdf", "reorder-pdf-pages"];

const pages = [
  ["index.html", "th"],
  ["en/index.html", "en"],
  ...tools.flatMap((tool) => [[`${tool}/index.html`, "th"], [`${tool}/en/index.html`, "en"]])
];

test("all bilingual PDF tool pages are exported with metadata", () => {
  for (const [relativePath, language] of pages) {
    const path = join(outDir, relativePath);
    assert.ok(existsSync(path), `${relativePath} should exist`);
    const html = readFileSync(path, "utf8");
    assert.match(html, new RegExp(`<html lang="${language}"`));
    assert.match(html, /DJTools/);
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /G-CGJ5BTR44T/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hrefLang="th"/i);
    assert.match(html, /hrefLang="en"/i);
  }
});

test("browser PDF worker and brand assets are exported", () => {
  for (const asset of ["pdf.worker.min.mjs", "djai-academy-logo.webp", "djai-academy-logo-display.webp", "djai-academy-logo-small.webp", "siamese-cat-dev-logo.webp", "favicon.svg"]) {
    assert.ok(existsSync(join(outDir, asset)), `${asset} should exist`);
  }
});

test("Chinese PDF hubs and canonical tools are fully exported", () => {
  const canonicalTools = tools.slice(0, 11);
  for (const [segment, locale, required] of [["zh-cn", "zh-CN", "选择(?: PDF|图片)"], ["zh-tw", "zh-TW", "選擇(?: PDF|圖片)"]]) {
    for (const relativePath of [`${segment}/index.html`, ...canonicalTools.map((tool) => `${tool}/${segment}/index.html`)]) {
      const path = join(outDir, relativePath);
      assert.ok(existsSync(path), `${relativePath} should exist`);
      const html = readFileSync(path, "utf8");
      assert.match(html, new RegExp(`<html lang="${locale}"`));
      assert.match(html, /name="robots" content="noindex, follow"/);
      assert.match(html, new RegExp(required));
      assert.doesNotMatch(html, /เลือกไฟล์|Tải file|Process files/);
    }
  }
});
