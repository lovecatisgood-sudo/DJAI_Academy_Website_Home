import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { MODEL_SOURCES } from "../scripts/fetch-models.mjs";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const vendorDir = join(projectDir, "public", "vendor");
const sourceAssetDir = join(projectDir, "assets", "vendor");

test("model assets are present and match their recorded checksums", () => {
  for (const source of MODEL_SOURCES) {
    for (const [label, path] of [["vendored source", join(sourceAssetDir, source.name)], ["public build", join(vendorDir, source.name)]]) {
      assert.equal(existsSync(path), true, `missing ${label}: ${source.name}`);
      assert.equal(statSync(path).size, source.bytes, `size mismatch in ${label}: ${source.name}`);
      const digest = createHash("sha256").update(readFileSync(path)).digest("hex");
      assert.equal(digest, source.sha256, `checksum mismatch in ${label}: ${source.name}`);
    }
  }
});

test("NOTICE credits the Apache-2.0 model authors", () => {
  const notice = readFileSync(join(projectDir, "NOTICE"), "utf8");
  assert.match(notice, /U\^?2-Net|U2-Net/);
  assert.match(notice, /Apache License, Version 2\.0/);
  assert.match(notice, /onnxruntime-web/);
});
