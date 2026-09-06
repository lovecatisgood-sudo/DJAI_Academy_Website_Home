import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const appRoot = join(import.meta.dirname, "..");
const read = (relativePath) => readFileSync(join(appRoot, relativePath), "utf8");
const pages = [
  ["Thai", read("app/portfolio/page.jsx"), "/development/"],
  ["English", read("app/portfolio/en/page.jsx"), "/development/en/"],
  ["Vietnamese", read("app/portfolio/vi/page.jsx"), "/development/vi/"],
];

test("Portfolio sends its primary proof journey to Development rather than Service", () => {
  for (const [locale, source, developmentPath] of pages) {
    const primaryLinks = [...source.matchAll(/className="button primary"\s+href=(?:"([^"]+)"|\{?[^}]+\}?)/g)];
    assert.ok(primaryLinks.length >= 1, `${locale}: missing primary proof CTA`);
    assert.match(source, new RegExp(`className="button primary" href="(?:https://www\\.djai\\.academy)?${developmentPath.replaceAll("/", "\\/")}`));
    assert.doesNotMatch(source, /className="button primary" href="https:\/\/www\.djai\.academy\/service\//);
    assert.doesNotMatch(source, /className="button primary" href="\/service\//);
  }
});

test("Cam PDF portfolio proof strengthens the owned product page before the store", () => {
  for (const [locale, source] of pages) {
    const camBlock = source.match(/Cam PDF Scan Signer QR Gen[\s\S]{0,900}/)?.[0] || "";
    assert.match(camBlock, /\/Cam_PDF_Scan_Signer_QR-Gen\//, `${locale}: Cam PDF proof bypasses the product page`);
    assert.doesNotMatch(camBlock, /play\.google\.com/, `${locale}: Cam PDF proof should not skip directly to Google Play`);
  }
});

test("commercial page roles remain proposition, chooser, and proof", () => {
  const development = read("app/development/en/page.jsx");
  const service = read("app/service/en/page.jsx");
  const portfolio = read("app/portfolio/en/page.jsx");
  assert.match(development, /custom software development/i);
  assert.match(service, /service categor(?:y|ies)|choose/i);
  assert.match(portfolio, /selected examples|portfolio/i);
});

test("Portfolio does not expose the currently broken Siamese Cat Hotel URL", () => {
  for (const [locale, source] of pages) {
    assert.doesNotMatch(source, /https:\/\/hotel\.siamesecat\.cafe\/?/, `${locale}: broken hotel link remains`);
  }
});
