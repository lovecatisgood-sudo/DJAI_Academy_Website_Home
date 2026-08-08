import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { tools, videoTools } from "../scripts/build.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
test("exports functional bilingual media routes", () => {
  assert.equal(Object.keys(tools).length, 9);
  for (const slug of Object.keys(tools)) for (const lang of ["th", "en"]) {
    const path = join(root, "public", slug, ...(lang === "en" ? ["en"] : []), "index.html");
    assert.equal(existsSync(path), true, path);
    const html = readFileSync(path, "utf8");
    assert.match(html, new RegExp(`<link rel="canonical" href="https://www.djai.academy/tools/media/${slug}/${lang === "en" ? "en/" : ""}">`));
    assert.match(html, /hreflang="x-default"/);
    assert.match(html, /data-tool=/);
  }
});
test("ships FFmpeg core locally", () => {
  for (const file of ["vendor/core/ffmpeg-core.js", "vendor/core/ffmpeg-core.wasm", "vendor/ffmpeg/index.js", "vendor/ffmpeg/worker.js"]) assert.equal(existsSync(join(root, "public", file)), true, file);
  assert.ok(readFileSync(join(root, "public/vendor/core/ffmpeg-core.wasm")).byteLength > 10_000_000);
});

test("exports 23 differentiated bilingual video tools", () => {
  assert.equal(videoTools.length, 23);
  assert.equal(new Set(videoTools.map((tool) => tool.slug)).size, 23);

  const titles = { th: new Set(), en: new Set() };
  const descriptions = { th: new Set(), en: new Set() };
  for (const tool of videoTools) {
    assert.ok(tool.mode, `${tool.slug}: missing mode`);
    for (const lang of ["th", "en"]) {
      const directory = join(root, "public", tool.slug, ...(lang === "en" ? ["en"] : []));
      const path = join(directory, "index.html");
      assert.equal(existsSync(path), true, path);
      const html = readFileSync(path, "utf8");
      const suffix = lang === "en" ? "en/" : "";
      const canonical = `https://www.djai.academy/tools/media/${tool.slug}/${suffix}`;
      const alternate = lang === "en"
        ? `https://www.djai.academy/tools/media/${tool.slug}/`
        : `https://www.djai.academy/tools/media/${tool.slug}/en/`;

      assert.match(html, new RegExp(`<html lang="${lang}"`));
      assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`));
      assert.match(html, new RegExp(`hreflang="${lang === "en" ? "th" : "en"}" href="${alternate}"`));
      assert.match(html, /hreflang="x-default"/);
      assert.equal((html.match(/<h1\b/g) || []).length, 1, `${tool.slug}/${lang}: H1 count`);
      assert.match(html, /id="video-tool-app"/);
      assert.match(html, /video-tools\.js\?v=20260809b/);
      assert.match(html, /video-tools\.css\?v=20260809a/);
      assert.doesNotMatch(html, /cdn\.jsdelivr\.net\/npm\/@ffmpeg\/core/);

      const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
      const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
      assert.ok(title && !titles[lang].has(title), `${tool.slug}/${lang}: duplicate or missing title`);
      assert.ok(description && !descriptions[lang].has(description), `${tool.slug}/${lang}: duplicate or missing description`);
      titles[lang].add(title);
      descriptions[lang].add(description);

      const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      assert.equal(schemas.length, 3, `${tool.slug}/${lang}: structured data count`);
      for (const schema of schemas) assert.doesNotThrow(() => JSON.parse(schema[1]));
    }
  }
});

test("ships frame ZIP support only where it is needed", () => {
  const frameHtml = readFileSync(join(root, "public", "extract-frames-from-video", "en", "index.html"), "utf8");
  const converterHtml = readFileSync(join(root, "public", "video-converter", "en", "index.html"), "utf8");
  assert.match(frameHtml, /vendor\/jszip\/jszip\.min\.js\?v=20260809a/);
  assert.doesNotMatch(converterHtml, /vendor\/jszip\/jszip\.min\.js/);
  assert.equal(existsSync(join(root, "public", "vendor", "jszip", "jszip.min.js")), true);
  assert.equal(existsSync(join(root, "public", "vendor", "jszip", "LICENSE.markdown")), true);
});

test("media hub discovers every video route", () => {
  for (const lang of ["th", "en"]) {
    const html = readFileSync(join(root, "public", ...(lang === "en" ? ["en"] : []), "index.html"), "utf8");
    for (const tool of videoTools) {
      const suffix = lang === "en" ? "en/" : "";
      assert.match(html, new RegExp(`href="/tools/media/${tool.slug}/${suffix}"`), `${lang}: ${tool.slug}`);
    }
  }
});

test("shared video runtime parses", () => {
  const result = spawnSync(process.execPath, ["--check", join(root, "src", "video-tools.js")], {
    encoding: "utf8"
  });
  assert.equal(result.status, 0, result.stderr);
});
