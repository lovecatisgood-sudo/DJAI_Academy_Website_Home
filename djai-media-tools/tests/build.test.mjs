import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { tools } from "../scripts/build.mjs";

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
