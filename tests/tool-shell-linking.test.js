import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = join(import.meta.dirname, "..");
const read = (path) => readFileSync(join(root, path), "utf8");

const qrShells = [
  read("DJayTools-Free-QR-Generator-Source/app/page.tsx"),
  read("DJayTools-Free-QR-Generator-Source/app/en/page.tsx"),
  read("DJayTools-Free-QR-Generator-Source/app/vi/page.tsx"),
];

test("QR headers and footers preserve their shells but use owned acquisition routes", () => {
  for (const source of qrShells) {
    assert.match(source, /className="site-header"/);
    assert.match(source, /Cam_PDF_Scan_Signer_QR-Gen/);
    assert.match(source, /development/);
    assert.doesNotMatch(source, /(?:www\.djai\.academy)?\/academy\//);
    assert.doesNotMatch(source, /(?:www\.djai\.academy)?\/service\//);
    assert.doesNotMatch(source, /hotel\.siamesecat\.cafe/);
  }
});

test("media tool shells link to Development and not legacy learning pages", () => {
  const source = read("djai-media-tools/scripts/build.mjs");
  assert.match(source, /\/development\//);
  assert.doesNotMatch(source, /\/academy\//);
  assert.doesNotMatch(source, /\/course\//);
});

test("image tool footers link to School and Development without broken ecosystem links", () => {
  const generator = read("djai-image-resizer/scripts/generate-seo-pages.mjs");
  for (const path of ["djai-image-resizer/public/index.html", "djai-image-resizer/public/en/index.html"]) {
    const source = read(path);
    assert.match(source, /school\.djai\.academy\/(?:th|en)/);
    assert.match(source, /\/development\//);
    assert.doesNotMatch(source, /(?:www\.djai\.academy)?\/academy\//);
    assert.doesNotMatch(source, /(?:www\.djai\.academy)?\/course\//);
    assert.doesNotMatch(source, /(?:www\.djai\.academy)?\/service\//);
    assert.doesNotMatch(source, /hotel\.siamesecat\.cafe/);
  }
  assert.doesNotMatch(generator, /replaceAll\("https:\/\/school\.djai\.academy\//);
  assert.doesNotMatch(generator, /www\.djai\.academy\/academy/);
});

test("document AI bridge sends learning intent to School", () => {
  const source = read("djai-document-tools/app/AcquisitionBridge.tsx");
  assert.match(source, /school\.djai\.academy\/th/);
  assert.match(source, /school\.djai\.academy\/en/);
  assert.doesNotMatch(source, /\/siamese_cat\/dev\/(?:course|courses)/);
});
