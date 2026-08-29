import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const groups = {
  document: ["docx-to-pdf", "docx-to-html", "docx-to-markdown", "docx-to-text", "pdf-to-text", "pdf-to-word", "ocr"],
  ai: ["token-counter", "pdf-to-ai-markdown", "context-optimizer", "rag-chunk-calculator", "prompt-packager"],
  spreadsheet: ["csv-to-json", "json-to-csv", "csv-cleaner", "merge-csv", "split-csv", "csv-to-xlsx", "xlsx-to-csv"]
};

test("every tool exports Thai and English SEO pages", () => {
  for (const [category, tools] of Object.entries(groups)) {
    for (const slug of tools) {
      for (const languagePath of [[], ["en"]]) {
        const file = join(root, "out", category, slug, ...languagePath, "index.html");
        assert.equal(existsSync(file), true, `missing ${file}`);
        const html = readFileSync(file, "utf8");
        assert.match(html, /rel="canonical"/);
        assert.match(html, /hreflang="th"/i);
        assert.match(html, /hreflang="en"/i);
        assert.match(html, /application\/ld\+json/);
        assert.doesNotMatch(html, /noindex/i);
        assert.match(html, languagePath.length ? /<html lang="en">/ : /<html lang="th">/);
      }
    }
  }
});

test("category hubs and local processing assets exist", () => {
  for (const category of Object.keys(groups)) {
    assert.equal(existsSync(join(root, "out", category, "index.html")), true);
    assert.equal(existsSync(join(root, "out", category, "en", "index.html")), true);
  }
  for (const asset of [
    "out/document/pdf.worker.min.mjs",
    "out/document/ocr-runtime/worker.min.js",
    "out/document/ocr-data/eng.traineddata.gz",
    "out/document/ocr-data/tha.traineddata.gz",
    "out/djai-assets/djai-academy-logo.webp",
    "out/djai-assets/djai-academy-logo-display.webp",
    "out/djai-assets/djai-academy-logo-small.webp",
    "out/djai-assets/siamese-cat-dev-logo.webp"
  ]) assert.equal(existsSync(join(root, asset)), true, `missing ${asset}`);
});

test("brand hub and favicon generator export reciprocal locale pages", () => {
  for (const [route, language] of [
    ["out/brand/index.html", "th"],
    ["out/brand/en/index.html", "en"],
    ["out/brand/vi/index.html", "vi"],
    ["out/brand/favicon-generator/index.html", "th"],
    ["out/brand/favicon-generator/en/index.html", "en"],
    ["out/brand/favicon-generator/vi/index.html", "vi"]
  ]) {
    const file = join(root, route);
    assert.equal(existsSync(file), true, `missing ${file}`);
    const html = readFileSync(file, "utf8");
    assert.match(html, new RegExp(`<html lang="${language}">`));
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hreflang="th"/i);
    assert.match(html, /hreflang="en"/i);
    assert.match(html, /hreflang="vi"/i);
    assert.match(html, /application\/ld\+json/);
    assert.doesNotMatch(html, /noindex/i);
  }
});

test("privacy copy does not make server-processing claims", () => {
  const source = readFileSync(join(root, "app", "tool-data.ts"), "utf8");
  assert.doesNotMatch(source, /pixel-perfect/i);
  assert.doesNotMatch(source, /temporarily uploaded/i);
  assert.match(source, /Complex layouts/);
  assert.match(source, /text-focused converter/);
});

test("Chinese category, tool, brand, and favicon pages are fully exported", () => {
  for (const [segment, locale, action] of [["zh-cn", "zh-CN", /选择|粘贴/], ["zh-tw", "zh-TW", /選擇|貼上/]]) {
    for (const [category, slugs] of Object.entries(groups)) {
      for (const relative of [`${category}/${segment}/index.html`, ...slugs.map((slug) => `${category}/${slug}/${segment}/index.html`)]) {
        const file = join(root, "out", relative);
        assert.equal(existsSync(file), true, `missing ${file}`);
        const html = readFileSync(file, "utf8");
        const visible = html.replace(/<script[\s\S]*?<\/script>/g, "");
        assert.match(html, new RegExp(`<html lang="${locale}"`));
        assert.match(html, /name="robots" content="noindex, follow"/);
        assert.match(html, /hreflang="zh-CN"/i);
        assert.match(html, /hreflang="zh-TW"/i);
        assert.match(visible, action);
        assert.doesNotMatch(visible, /เลือกไฟล์|Choose files to process|Chọn file cần xử lý/);
      }
    }
    for (const relative of [`brand/${segment}/index.html`, `brand/favicon-generator/${segment}/index.html`]) {
      const html = readFileSync(join(root, "out", relative), "utf8");
      assert.match(html, new RegExp(`<html lang="${locale}"`));
      assert.match(html, /name="robots" content="noindex, follow"/);
      assert.match(html, /application\/ld\+json/);
    }
  }
});
