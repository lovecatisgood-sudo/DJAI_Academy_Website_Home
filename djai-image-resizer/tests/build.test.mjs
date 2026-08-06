import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { presets } from "../scripts/generate-seo-pages.mjs";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(projectDir, "public");

test("all SEO presets have Thai and English static pages", () => {
  assert.equal(presets.length, 17);
  assert.equal(presets.some((preset) => preset.slug === "remove-background-image"), true);
  for (const preset of presets) {
    for (const language of ["th", "en"]) {
      const path = join(publicDir, preset.slug, ...(language === "en" ? ["en"] : []), "index.html");
      assert.equal(existsSync(path), true, path);
      const html = readFileSync(path, "utf8");
      const canonical = `https://www.djai.academy/tools/resizeimg/${preset.slug}/${language === "en" ? "en/" : ""}`;
      assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
      assert.match(html, /hreflang="th"/);
      assert.match(html, /hreflang="en"/);
      assert.match(html, /hreflang="x-default"/);
      assert.match(html, new RegExp(`data-preset="${preset.slug}"`));
      assert.match(html, /"@type":"HowTo"/);
      assert.match(html, /"@type":"BreadcrumbList"/);
      assert.match(html, /"@type":"FAQPage"/);
    }
  }
});

test("processing libraries are bundled locally", () => {
  const heic = join(publicDir, "vendor", "heic2any.min.js");
  const zip = join(publicDir, "vendor", "jszip.min.js");
  const backgroundRemoval = join(publicDir, "vendor", "background-removal.mjs");
  assert.equal(existsSync(heic), true);
  assert.equal(existsSync(zip), true);
  assert.equal(existsSync(backgroundRemoval), true);
  assert.ok(readFileSync(heic).byteLength > 1_000_000);
  assert.ok(readFileSync(zip).byteLength > 50_000);
  // The engine bundle is first-party glue plus the onnxruntime-web wasm loader.
  // It is deliberately small; the weights and wasm are separate vendor assets.
  assert.ok(readFileSync(backgroundRemoval).byteLength > 20_000);
});

test("background-removal runtime assets are self-hosted", () => {
  const model = join(publicDir, "vendor", "models", "u2netp.onnx");
  const wasm = join(publicDir, "vendor", "ort", "ort-wasm-simd-threaded.wasm");
  assert.equal(existsSync(model), true, "u2netp.onnx must be fetched into public/vendor/models");
  assert.equal(existsSync(wasm), true, "ORT wasm must be copied into public/vendor/ort");
  assert.equal(readFileSync(model).byteLength, 4_574_861);
  assert.ok(readFileSync(wasm).byteLength > 10_000_000);
});

test("no AGPL dependency remains", () => {
  const pkg = readFileSync(join(projectDir, "package.json"), "utf8");
  const lock = readFileSync(join(projectDir, "package-lock.json"), "utf8");
  assert.doesNotMatch(pkg, /@imgly/);
  assert.doesNotMatch(lock, /@imgly/);
});

test("the shipped engine bundle contacts no third-party CDN", () => {
  const bundle = readFileSync(join(publicDir, "vendor", "background-removal.mjs"), "utf8");
  assert.doesNotMatch(bundle, /staticimgly|unpkg\.com|cdn\.jsdelivr/i);
});

test("public image-tool code has no donor canonical or runtime CDN", () => {
  const files = ["app.js", "index.html", "en/index.html"];
  for (const file of files) {
    const content = readFileSync(join(publicDir, file), "utf8");
    assert.doesNotMatch(content, /chatgpt\.site|eri-rehcm|cdn\.jsdelivr/i);
  }
});

test("display assets and analytics are optimized for initial load", () => {
  for (const asset of ["assets/djai-academy-logo.webp", "assets/siamese-cat-dev-transparent.webp"]) {
    assert.equal(existsSync(join(publicDir, asset)), true, asset);
  }
  for (const file of ["index.html", "en/index.html"]) {
    const html = readFileSync(join(publicDir, file), "utf8");
    assert.doesNotMatch(html, /<script async src="https:\/\/www\.googletagmanager\.com/);
    assert.match(html, /requestIdleCallback/);
    assert.match(html, /djai-academy-logo\.webp/);
  }
});

test("base pages expose complete batch and comparison controls", () => {
  for (const file of ["index.html", "en/index.html"]) {
    const html = readFileSync(join(publicDir, file), "utf8");
    for (const id of ["batch-list", "preset-select", "panel-background", "quality-input", "compare-view", "batch-results"]) {
      assert.match(html, new RegExp(`id="${id}"`));
    }
    assert.match(html, /multiple hidden/);
    assert.match(html, /image\/heic/);
    assert.match(html, /image\/avif/);
  }
});

test("the background-removal page carries its own FAQ, not the resizer default", () => {
  for (const language of ["th", "en"]) {
    const dir = join(publicDir, "remove-background-image", ...(language === "en" ? ["en"] : []));
    const html = readFileSync(join(dir, "index.html"), "utf8");
    assert.doesNotMatch(html, /Questions about image resizing/);
    const schema = html.match(/\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?\}\]\}/);
    assert.ok(schema, `FAQPage schema missing for ${language}`);
    assert.doesNotMatch(schema[0], /100 KB/, "FAQ schema must not describe the resizer");
    assert.match(schema[0], language === "th" ? /โปร่งใส/ : /transparent/i);
  }
});

test("other preset pages keep the shared FAQ and carry no model credit", () => {
  for (const slug of ["jpg-to-png", "compress-image", "heic-to-jpg"]) {
    const html = readFileSync(join(publicDir, slug, "en", "index.html"), "utf8");
    assert.match(html, /Questions about image resizing/, `${slug} lost the shared FAQ`);
    assert.doesNotMatch(html, /footer-credit/, `${slug} must not carry the model credit`);
  }
});
