import assert from "node:assert/strict";
import test from "node:test";
import { buildIco, installSnippet, manifestJson } from "../app/brand/favicon-generator/favicon-utils.ts";

test("ICO package contains a valid header and directory offsets", async () => {
  const images = [16, 32, 48].map((size) => ({ size, bytes: new Uint8Array([137, 80, 78, 71, size]) }));
  const blob = buildIco(images);
  const view = new DataView(await blob.arrayBuffer());
  assert.equal(view.getUint16(0, true), 0);
  assert.equal(view.getUint16(2, true), 1);
  assert.equal(view.getUint16(4, true), 3);
  assert.equal(view.getUint8(6), 16);
  assert.equal(view.getUint32(18, true), 54);
  assert.equal(blob.type, "image/x-icon");
});

test("manifest and snippet reference every install-critical asset", () => {
  const manifest = JSON.parse(manifestJson("#071327"));
  assert.equal(manifest.icons.length, 3);
  assert.equal(manifest.icons.at(-1).purpose, "maskable");
  assert.match(installSnippet, /favicon\.ico/);
  assert.match(installSnippet, /apple-touch-icon\.png/);
  assert.match(installSnippet, /site\.webmanifest/);
});
