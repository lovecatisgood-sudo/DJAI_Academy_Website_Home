import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const appRoot = join(import.meta.dirname, "..");
const read = (relativePath) => readFileSync(join(appRoot, relativePath), "utf8");
const pages = [
  ["Thai", read("app/page.jsx")],
  ["English", read("app/en/page.jsx")],
  ["Vietnamese", read("app/vi/page.jsx")],
];

test("localized homepages preserve the existing visual composition", () => {
  for (const [locale, source] of pages) {
    for (const className of ["hero", "hero-grid", "hero-actions", "hero-visual", "quick-routes", "route-card"]) {
      assert.match(source, new RegExp(`className=["'][^"']*${className}`), `${locale}: preserve ${className}`);
    }
    assert.match(source, /founder-djai-display\.webp/, `${locale}: preserve founder visual`);
  }
});

test("each homepage has one descriptive H1", () => {
  for (const [locale, source] of pages) {
    const headings = [...source.matchAll(/<h1>([\s\S]*?)<\/h1>/g)];
    assert.equal(headings.length, 1, `${locale}: expected exactly one H1 in source`);
    const text = headings[0][1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    assert.notEqual(text, "DJAI Academy", `${locale}: H1 must explain the homepage proposition`);
    assert.ok(text.length >= 24, `${locale}: H1 is not descriptive enough`);
  }
});

test("every homepage routes Development, Tools, Cam PDF, and School without legacy learning CTAs", () => {
  for (const [locale, source] of pages) {
    assert.match(source, /development/, `${locale}: missing Development journey`);
    assert.match(source, /tools/, `${locale}: missing Tools journey`);
    assert.match(source, /Cam_PDF_Scan_Signer_QR-Gen/, `${locale}: missing Cam PDF journey`);
    assert.match(source, /schoolUrlFor/, `${locale}: missing School journey`);
    assert.doesNotMatch(source, /(?:href=|:\s*)["'][^"']*\/course\//, `${locale}: legacy course CTA remains`);
    assert.doesNotMatch(source, /(?:href=|:\s*)["'][^"']*\/academy\//, `${locale}: legacy community CTA remains`);
  }
});

test("Development or project enquiry is the primary hero action", () => {
  for (const [locale, source] of pages) {
    const hero = source.match(/<div className="hero-actions">([\s\S]*?)<\/div>/)?.[1] || "";
    assert.match(hero, /className="button primary"/);
    assert.match(hero, /(?:development|mailto:contact@djai\.academy)/, `${locale}: primary action is not commercial`);
  }
});

test("all homepages use the shared header and footer", () => {
  for (const [locale, source] of pages) {
    assert.match(source, /import SiteHeader/);
    assert.match(source, /import SiteFooter/);
    assert.match(source, /<SiteHeader/);
    assert.match(source, /<SiteFooter/);
  }
});
