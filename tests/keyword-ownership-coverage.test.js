const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const ownership = JSON.parse(readFileSync(path.join(root, "data/seo/keyword-ownership.json"), "utf8"));
const sitemap = readFileSync(path.join(root, "djai-academy-homepage/.next/server/app/sitemap.xml.body"), "utf8");
const sitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/www\.djai\.academy([^<]+)<\/loc>/g)]
  .map((match) => match[1]);

const requiredFields = [
  "property",
  "canonical",
  "audience",
  "visitorProblem",
  "primaryQueryFamily",
  "promise",
  "pageRole",
  "conversionTarget",
  "primaryConversion",
  "evidenceSource",
  "validatedAt",
  "migrationStatus",
];

test("every main-domain sitemap URL has exactly one ownership row", () => {
  const ownerCounts = new Map();
  for (const row of ownership.entries) {
    ownerCounts.set(row.route, (ownerCounts.get(row.route) || 0) + 1);
  }

  const missing = sitemapRoutes.filter((route) => !ownerCounts.has(route));
  const duplicated = sitemapRoutes.filter((route) => ownerCounts.get(route) !== 1);
  const extraIndexable = ownership.entries
    .filter((row) => row.indexable && !sitemapRoutes.includes(row.route))
    .map((row) => row.route);

  assert.deepEqual(missing, [], `missing owners:\n${missing.join("\n")}`);
  assert.deepEqual(duplicated, [], `duplicate route owners:\n${duplicated.join("\n")}`);
  assert.deepEqual(extraIndexable, [], `indexable owners absent from sitemap:\n${extraIndexable.join("\n")}`);
  assert.equal(new Set(sitemapRoutes).size, sitemapRoutes.length, "sitemap routes must be unique");
});

test("every ownership row carries the complete decision record", () => {
  for (const row of ownership.entries) {
    for (const field of requiredFields) {
      assert.equal(
        typeof row[field],
        "string",
        `${row.route}: ${field} must be a string`,
      );
      assert.ok(row[field].trim().length > 0, `${row.route}: ${field} must not be empty`);
    }
    assert.equal(row.property, "www", `${row.route}: current sitemap owner`);
    assert.equal(row.canonical, `https://www.djai.academy${row.route}`, `${row.route}: canonical`);
    assert.match(row.validatedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
});
