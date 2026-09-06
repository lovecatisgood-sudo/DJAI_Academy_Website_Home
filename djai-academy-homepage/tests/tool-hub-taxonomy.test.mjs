import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { getToolDirectory } from "../app/tools/tool-directory.js";

const appRoot = join(import.meta.dirname, "..");
const read = (relativePath) => readFileSync(join(appRoot, relativePath), "utf8");
const thai = read("app/tools/page.jsx");
const english = read("app/tools/en/page.jsx");
const vietnamese = read("app/tools/vi/page.jsx");

test("the complete directory has nine distinct task categories and no repeated route", () => {
  const categories = getToolDirectory("en");
  assert.deepEqual(categories.map((category) => category.id), [
    "brand", "seo", "qr", "image", "pdf", "media", "document", "ai", "spreadsheet"
  ]);
  const destinations = categories.flatMap((category) => [category.href, ...category.tools.map((tool) => tool.href)]);
  assert.equal(new Set(destinations).size, destinations.length, "tool directory repeats a destination");
});

test("Thai and English hubs expose the approved architecture without legacy learning links", () => {
  for (const [locale, source] of [["Thai", thai], ["English", english]]) {
    assert.match(source, /ToolDirectorySection/);
    assert.match(source, /\/development\//, `${locale}: missing Development`);
    assert.match(source, /Cam_PDF_Scan_Signer_QR-Gen/, `${locale}: missing Cam PDF`);
    assert.match(source, /schoolUrlFor/, `${locale}: missing School`);
    assert.match(source, /\/blog\//, `${locale}: missing Resources`);
    assert.doesNotMatch(source, /(?:href=|:\s*)["'][^"']*\/course\//, `${locale}: legacy course link remains`);
    assert.doesNotMatch(source, /(?:href=|:\s*)["'][^"']*\/academy\//, `${locale}: legacy community link remains`);
  }
});

test("tool hubs strengthen the owned Cam PDF product page and Development proposition", () => {
  for (const [locale, source] of [["Thai", thai], ["English", english]]) {
    const camCallout = source.match(/tools-app-callout[\s\S]{0,900}/)?.[0] || "";
    assert.match(camCallout, /\/Cam_PDF_Scan_Signer_QR-Gen\//, `${locale}: Cam callout bypasses its product page`);
    assert.doesNotMatch(camCallout, /play\.google\.com/, `${locale}: Cam callout skips directly to the store`);
    assert.match(source, /href:\s*["']https:\/\/www\.djai\.academy\/development\//, `${locale}: ecosystem bridge does not use Development`);
  }
  assert.match(vietnamese, /\/development\/vi\//);
});

test("live tools are not listed as coming soon and broken ecosystem URLs are absent", () => {
  for (const [locale, source] of [["Thai", thai], ["English", english], ["Vietnamese", vietnamese]]) {
    assert.doesNotMatch(source, /https:\/\/hotel\.siamesecat\.cafe\/?/, `${locale}: broken hotel link remains`);
  }
  const thaiComingSoon = thai.match(/const comingSoon = ([\s\S]*?);/)?.[1] || "";
  const englishComingSoon = english.match(/const comingSoon = ([\s\S]*?);/)?.[1] || "";
  assert.doesNotMatch(thaiComingSoon, /Favicon/i);
  assert.doesNotMatch(englishComingSoon, /Favicon/i);
});

test("Vietnamese hub links every published top-level task family", () => {
  for (const path of ["qrgen", "resizeimg", "PDFTools", "media", "document", "ai", "spreadsheet"]) {
    assert.match(vietnamese, new RegExp(`/tools/${path}/`), `Vietnamese: missing ${path}`);
  }
});
