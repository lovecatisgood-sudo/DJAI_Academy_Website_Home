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

test("popular and discovery links stay on canonical image-tool routes", () => {
  const approvedRoutes = new Set(
    presets.flatMap(({ slug }) => [
      `/tools/resizeimg/${slug}/`,
      `/tools/resizeimg/${slug}/en/`
    ])
  );

  for (const language of ["th", "en"]) {
    for (const currentSlug of [null, ...presets.map(({ slug }) => slug)]) {
      const path = join(
        publicDir,
        ...(currentSlug ? [currentSlug] : []),
        ...(language === "en" ? ["en"] : []),
        "index.html"
      );
      const html = readFileSync(path, "utf8");
      const blocks = [
        html.match(/<div class="popular-links">([\s\S]*?)<\/div>/)?.[1],
        html.match(/<div class="tool-discovery-links">([\s\S]*?)<\/div>/)?.[1]
      ].filter(Boolean);

      assert.ok(blocks.length > 0, `${path} is missing image-tool navigation`);
      for (const block of blocks) {
        const hrefs = [...block.matchAll(/<a href="([^"]+)"/g)].map((match) => match[1]);
        assert.ok(hrefs.length > 0, `${path} has an empty image-tool navigation block`);
        for (const href of hrefs) {
          assert.equal(approvedRoutes.has(href), true, `${path} has a non-canonical image-tool link: ${href}`);
          assert.equal(
            language === "en" ? href.endsWith("/en/") : !href.endsWith("/en/"),
            true,
            `${path} links to the wrong locale: ${href}`
          );
        }
      }
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

test("the shared engine accepts an explicit asset base and cancellation signal", () => {
  const source = readFileSync(join(projectDir, "src", "engine", "remove.mjs"), "utf8");
  const entry = readFileSync(join(projectDir, "src", "background-removal-entry.mjs"), "utf8");
  assert.match(source, /options\.assetBase/);
  assert.match(source, /options\.signal/);
  assert.match(source, /fetch\(`\$\{assetBase\}\$\{model\.file\}`,[\s\S]*signal/);
  assert.match(entry, /ENGINE_VERSION/);
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

test("the background-removal page describes background removal, not resizing", () => {
  const html = readFileSync(join(publicDir, "remove-background-image", "en", "index.html"), "utf8");
  for (const resizerCopy of [
    "Smaller file. Same great image.",
    "From oversized to optimized in three steps.",
    "Your resized image will appear here",
    "Pick a resize method",
    "The complete resize process happens",
    "Open image resizer",
    ">IMAGE RESIZER<"
  ]) {
    assert.doesNotMatch(html, new RegExp(resizerCopy.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `resizer copy left on the background page: ${resizerCopy}`);
  }
  assert.match(html, /Cut out the subject\. Keep a transparent PNG\./);
  assert.match(html, /From photo to transparent PNG in three steps\./);
});

test("the scoped copy rewrite leaves the other preset pages untouched", () => {
  for (const slug of ["jpg-to-png", "compress-image", "heic-to-jpg", "resize-image"]) {
    const html = readFileSync(join(publicDir, slug, "en", "index.html"), "utf8");
    assert.match(html, /Smaller file\. Same great image\./, `${slug} lost the shared tool heading`);
    assert.match(html, /From oversized to optimized in three steps\./, `${slug} lost the shared how-section`);
    assert.match(html, />IMAGE RESIZER</, `${slug} lost the shared kicker`);
    assert.doesNotMatch(html, /bg-about-heading/, `${slug} must not carry the background prose block`);
  }
});

test("the model's key facts are in the rendered prose, not only in hidden UI", () => {
  for (const language of ["th", "en"]) {
    const dir = join(publicDir, "remove-background-image", ...(language === "en" ? ["en"] : []));
    const html = readFileSync(join(dir, "index.html"), "utf8");
    const prose = html.match(/<section class="seo-guide section-shell" aria-labelledby="bg-about-heading">[\s\S]*?<\/section>/);
    assert.ok(prose, `background prose block missing for ${language}`);
    // The block sits outside #editor-view, which is hidden until a file is added.
    assert.doesNotMatch(prose[0], /hidden/, "the prose block must not be inside hidden UI");
    for (const fact of ["18 MB", "U²-Net", "ONNX Runtime", "20"]) {
      assert.ok(prose[0].includes(fact), `${language} prose is missing the fact: ${fact}`);
    }
  }
});

test("the FAQ does not promise an unlimited batch the tool refuses", () => {
  const appJs = readFileSync(join(publicDir, "app.js"), "utf8");
  assert.match(appJs, /MAX_FILES = 20/, "batch cap moved; the FAQ copy needs rechecking");
  for (const language of ["th", "en"]) {
    const dir = join(publicDir, "remove-background-image", ...(language === "en" ? ["en"] : []));
    const html = readFileSync(join(dir, "index.html"), "utf8");
    assert.doesNotMatch(html, /no limit on how many images/);
    assert.doesNotMatch(html, /ไม่จำกัดจำนวนรูป/);
  }
});

test("the model credit is injected wherever the engine loads", () => {
  const appJs = readFileSync(join(publicDir, "app.js"), "utf8");
  assert.match(appJs, /const loadBackgroundRemoval = async \(\) => \{\s*showModelCredit\(\);/, "the credit must be shown when the model loads, on any preset page");
  assert.match(appJs, /U²-Net \(Apache-2\.0\)/);
  assert.match(appJs, /Xuebin Qin/);
});

test("the compare slider puts the result under the After label", () => {
  const css = readFileSync(join(publicDir, "styles.css"), "utf8");
  const appJs = readFileSync(join(publicDir, "app.js"), "utf8");
  // .compare-after is anchored right, so the result must be clipped from the left.
  assert.match(css, /\.compare-after \{ right: 12px; \}/);
  assert.match(css, /\.compare-view > div \{ overflow: hidden; clip-path: inset\(0 0 0 50%\); \}/);
  assert.match(appJs, /clipPath = `inset\(0 0 0 \$\{Number\(els\.compareSlider\.value\)\}%\)`/);
});
