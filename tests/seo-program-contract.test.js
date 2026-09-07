import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  formatSummary,
  validateKeywordOwnership
} from "../scripts/seo/validate-keyword-ownership.mjs";

const ownership = JSON.parse(
  readFileSync(new URL("../data/seo/keyword-ownership.json", import.meta.url), "utf8")
);
const routing = JSON.parse(
  readFileSync(new URL("../data/seo/acquisition-routing.json", import.meta.url), "utf8")
);

const locales = new Set(["th", "en", "vi", "zh-CN", "zh-TW"]);
const conversionTargets = new Set([
  "none", "tool", "cam_pdf", "development", "course", "portfolio"
]);
const evidenceStatuses = new Set([
  "verified_gsc", "directional_external", "strategy_only"
]);
const requiredClusters = [
  "pdf", "qr", "document", "ai", "spreadsheet", "seo", "image", "media", "vibe"
];

function normalizedQuery(row) {
  return `${row.locale}:${row.primaryQueryFamily.trim().toLocaleLowerCase(row.locale)}`;
}

test("keyword ownership rows expose the required decision fields", () => {
  assert.equal(ownership.version, 1);
  assert.ok(ownership.entries.length > 0);

  for (const row of ownership.entries) {
    assert.equal(typeof row.route, "string");
    assert.match(row.route, /^\//);
    assert.equal(locales.has(row.locale), true, `${row.route}: invalid locale`);
    assert.ok(row.cluster.length > 0, `${row.route}: cluster`);
    assert.ok(row.primaryQueryFamily.length > 0, `${row.route}: primaryQueryFamily`);
    assert.ok(row.pageRole.length > 0, `${row.route}: pageRole`);
    assert.ok(row.audience.length > 0, `${row.route}: audience`);
    assert.ok(row.promise.length > 0, `${row.route}: promise`);
    assert.ok(Array.isArray(row.supportingQueries), `${row.route}: supportingQueries`);
    assert.ok(Array.isArray(row.competingDjaiRoutes), `${row.route}: competingDjaiRoutes`);
    assert.equal(conversionTargets.has(row.conversionTarget), true, `${row.route}: conversionTarget`);
    assert.equal(evidenceStatuses.has(row.evidenceStatus), true, `${row.route}: evidenceStatus`);
    assert.equal(typeof row.indexable, "boolean", `${row.route}: indexable`);
  }
});

test("each route-locale and indexable primary query family has one owner", () => {
  const routeOwners = new Set();
  const queryOwners = new Map();

  for (const row of ownership.entries) {
    const routeKey = `${row.route}|${row.locale}`;
    assert.equal(routeOwners.has(routeKey), false, `duplicate route owner: ${routeKey}`);
    routeOwners.add(routeKey);

    if (!row.indexable) continue;
    const queryKey = normalizedQuery(row);
    assert.equal(
      queryOwners.has(queryKey),
      false,
      `primary query collision: ${queryKey} (${queryOwners.get(queryKey)} and ${row.route})`
    );
    queryOwners.set(queryKey, row.route);
  }
});

test("the manifest covers every current PDF and QR working route", () => {
  const routeKeys = new Set(ownership.entries.map((row) => `${row.route}|${row.locale}`));
  const pdfTools = [
    "merge-pdf", "split-pdf", "compress-pdf", "images-to-pdf", "pdf-to-images",
    "rotate-pdf", "watermark-pdf", "protect-pdf", "organize-pdf", "add-page-numbers",
    "remove-pdf-metadata"
  ];
  const pdfAliases = [
    "jpg-to-pdf", "pdf-to-jpg", "png-to-pdf", "webp-to-pdf", "pdf-to-png",
    "extract-pdf-pages", "delete-pages-from-pdf", "reorder-pdf-pages"
  ];
  const qrTools = [
    "url-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator",
    "text-qr-code-generator", "email-qr-code-generator", "whatsapp-qr-code-generator",
    "qr-code-generator-with-logo"
  ];

  for (const tool of pdfTools) {
    for (const locale of ["th", "en", "vi"]) {
      const segment = locale === "th" ? "" : `${locale}/`;
      assert.equal(routeKeys.has(`/tools/PDFTools/${tool}/${segment}|${locale}`), true);
    }
  }
  for (const tool of pdfAliases) {
    for (const locale of ["th", "en"]) {
      const segment = locale === "th" ? "" : "en/";
      assert.equal(routeKeys.has(`/tools/PDFTools/${tool}/${segment}|${locale}`), true);
    }
  }
  for (const tool of qrTools) {
    for (const locale of ["th", "en", "vi"]) {
      const segment = locale === "th" ? "" : `${locale}/`;
      assert.equal(routeKeys.has(`/tools/qrgen/${tool}/${segment}|${locale}`), true);
    }
  }
});

test("acquisition routing is deterministic for every approved cluster", () => {
  assert.equal(routing.version, 1);
  for (const cluster of requiredClusters) {
    assert.ok(routing.clusters[cluster], `missing routing cluster: ${cluster}`);
    assert.equal(typeof routing.clusters[cluster].primary, "string");
    assert.equal(typeof routing.clusters[cluster].secondary, "string");
    assert.match(routing.clusters[cluster].after, /^related_(tool|guide)$/);
  }
});

test("the validator reports a deterministic ownership summary", () => {
  const summary = formatSummary(
    validateKeywordOwnership(ownership, routing),
    ownership.entries.length
  );

  assert.match(summary, new RegExp(`Validated ${ownership.entries.length} ownership entries\\.`));
  assert.match(summary, /en:/);
  assert.match(summary, /th:/);
  assert.match(summary, /vi:/);
  assert.match(summary, /zh-CN:/);
  assert.match(summary, /zh-TW:/);
  assert.match(summary, /pdf=/);
  assert.match(summary, /qr=/);
});

test("the validator rejects duplicate owners and unknown conversion targets", () => {
  const duplicateOwnership = structuredClone(ownership);
  duplicateOwnership.entries.push(structuredClone(duplicateOwnership.entries[0]));
  assert.throws(
    () => validateKeywordOwnership(duplicateOwnership, routing),
    /duplicate route-locale owner|primary query collision/
  );

  const unknownTargetOwnership = structuredClone(ownership);
  unknownTargetOwnership.entries[0].conversionTarget = "random_promotion";
  assert.throws(
    () => validateKeywordOwnership(unknownTargetOwnership, routing),
    /unknown conversion target random_promotion/
  );
});

test("the validator enforces School ownership of future public learning discovery", () => {
  const invalidBoundary = structuredClone(ownership);
  invalidBoundary.propertyBoundaries.www.publicLearningDiscovery = true;
  assert.throws(
    () => validateKeywordOwnership(invalidBoundary, routing),
    /www must not own new public learning discovery/
  );

  const invalidMigration = structuredClone(ownership);
  const englishCourse = invalidMigration.entries.find((row) => row.route === "/course/en/");
  englishCourse.futureUrl = "https://www.djai.academy/course/en/";
  assert.throws(
    () => validateKeywordOwnership(invalidMigration, routing),
    /future learning URL must use school\.djai\.academy/
  );
});

test("the validator rejects incomplete or inconsistent route decision records", () => {
  const missingCanonical = structuredClone(ownership);
  delete missingCanonical.entries[0].canonical;
  assert.throws(
    () => validateKeywordOwnership(missingCanonical, routing),
    /canonical must be a non-empty string/
  );

  const mismatchedCanonical = structuredClone(ownership);
  mismatchedCanonical.entries[0].canonical = "https://www.djai.academy/wrong/";
  assert.throws(
    () => validateKeywordOwnership(mismatchedCanonical, routing),
    /canonical must equal the public route/
  );
});
