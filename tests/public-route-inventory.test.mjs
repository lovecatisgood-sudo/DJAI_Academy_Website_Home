import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  classifyPublicUrl,
  parseSitemap
} from "../scripts/capture-public-route-inventory.mjs";

const wwwFixture = readFileSync(
  new URL("./fixtures/www-sitemap-2026-08-29.xml", import.meta.url),
  "utf8"
);
const schoolFixture = readFileSync(
  new URL("./fixtures/school-sitemap-2026-08-29.xml", import.meta.url),
  "utf8"
);

test("saved live main sitemap is fully classified", () => {
  const urls = parseSitemap(wwwFixture);
  const records = urls.map((url) => classifyPublicUrl(url, "www"));

  assert.equal(urls.length, 345);
  assert.equal(records.filter((record) => record.family === "tools").length, 267);
  assert.ok(records.some((record) => record.application === "djai-pdf-tools"));
  assert.ok(records.every((record) => record.semanticId && record.sourceUrl));
});

test("School inventory excludes authenticated areas", () => {
  const urls = parseSitemap(schoolFixture);
  const records = urls.map((url) => classifyPublicUrl(url, "school"));

  assert.equal(urls.length, 10);
  assert.ok(records.every((record) => record.application === "djai-school"));
  assert.equal(
    records.some((record) => /admin|classroom|settings/.test(record.sourceUrl)),
    false
  );
});

test("locale variants share one semantic identity", () => {
  const thai = classifyPublicUrl("https://www.djai.academy/tools/qrgen/", "www");
  const english = classifyPublicUrl("https://www.djai.academy/tools/qrgen/en/", "www");
  const vietnamese = classifyPublicUrl("https://www.djai.academy/tools/qrgen/vi/", "www");

  assert.equal(thai.semanticId, "tools.qrgen.index");
  assert.equal(english.semanticId, thai.semanticId);
  assert.equal(vietnamese.semanticId, thai.semanticId);
  assert.equal(thai.locale, "th");
  assert.equal(english.locale, "en");
  assert.equal(vietnamese.locale, "vi");
});

test("known compatibility aliases are excluded from Chinese generation", () => {
  const alias = classifyPublicUrl(
    "https://www.djai.academy/tools/word-to-pdf/",
    "www"
  );

  assert.equal(alias.isAlias, true);
  assert.equal(alias.canonicalId, "tools.document.docx-to-pdf");
});
