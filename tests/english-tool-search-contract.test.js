const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const ownership = JSON.parse(
  readFileSync(path.join(root, "data/seo/keyword-ownership.json"), "utf8"),
);

const englishTools = ownership.entries.filter(
  (row) => row.locale === "en" && row.indexable && row.pageRole === "working_tool",
);

function normalize(query) {
  return query.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function routeSlug(route) {
  return route.split("/").filter(Boolean).at(-2).replaceAll("-", " ");
}

test("all English working tools own a researched long-tail query set", () => {
  assert.equal(englishTools.length, 92, "English tool inventory changed; review query ownership");

  const primaryOwners = new Map();
  for (const row of englishTools) {
    const primary = normalize(row.primaryQueryFamily);
    assert.ok(primary.split(" ").length >= 4, `${row.route}: primary query is not long-tail`);
    assert.notEqual(row.evidenceStatus, "strategy_only", `${row.route}: research evidence is missing`);
    assert.ok(
      row.evidenceSource.includes("2026-09-07"),
      `${row.route}: evidence source must identify the English research pass`,
    );
    assert.equal(row.supportingQueries.length >= 3, true, `${row.route}: needs 3 supporting queries`);
    assert.equal(
      new Set(row.supportingQueries.map(normalize)).size,
      row.supportingQueries.length,
      `${row.route}: duplicate supporting query`,
    );
    assert.equal(primaryOwners.has(primary), false, `${row.route}: duplicate primary query`);
    primaryOwners.set(primary, row.route);
  }
});

test("every English tool has route-specific supporting queries rather than generic placeholders", () => {
  for (const row of englishTools) {
    const slug = routeSlug(row.route);
    const genericPatterns = [
      `${slug} online free`,
      `${slug} without sign up`,
      `${slug} browser tool for private`,
    ];
    for (const query of row.supportingQueries) {
      const normalized = normalize(query);
      for (const pattern of genericPatterns) {
        assert.notEqual(
          normalized.startsWith(normalize(pattern)),
          true,
          `${row.route}: generic supporting-query placeholder remains: ${query}`,
        );
      }
    }
  }
});

test("supporting query families do not create a second owner", () => {
  const owners = new Map();
  for (const row of englishTools) {
    for (const query of [row.primaryQueryFamily, ...row.supportingQueries]) {
      const family = normalize(query);
      const priorOwner = owners.get(family);
      assert.ok(
        !priorOwner || priorOwner === row.route,
        `${family}: assigned to both ${priorOwner} and ${row.route}`,
      );
      owners.set(family, row.route);
    }
  }
});

test("English tool evidence labels remain traceable to supplied research artifacts", () => {
  for (const row of englishTools) {
    assert.notEqual(
      row.evidenceStatus,
      "verified_gsc",
      `${row.route}: Search Console evidence is not supplied in this repository`,
    );
    assert.equal(
      row.evidenceSource,
      "feature_validation_and_live_serp_review_2026-09-07",
      `${row.route}: evidence source must identify the current qualitative research pass`,
    );
    assert.equal(row.validatedAt, "2026-09-07", `${row.route}: stale validation date`);
  }
});

test("English query targets do not promise unsupported results", () => {
  for (const row of englishTools) {
    const queries = [row.primaryQueryFamily, ...row.supportingQueries].join(" | ");
    assert.doesNotMatch(queries, /\bunlimited\b/i, `${row.route}: unsupported unlimited claim`);
    assert.doesNotMatch(queries, /\bno file[- ]size limit\b/i, `${row.route}: unsupported size claim`);
    assert.doesNotMatch(
      queries,
      /\b(?:exact|exactly)\s+\d+\s*(?:kb|mb)\b/i,
      `${row.route}: exact-size output is not guaranteed`,
    );
  }
});

test("approximate target and interval tools describe their real constraints", () => {
  const approximateRoutes = englishTools.filter((row) =>
    /(?:image-to-(?:100|500)kb|resize-image-to-200kb|compress-video-to-(?:10|25|50|100)mb)/.test(row.route),
  );
  assert.equal(approximateRoutes.length, 7);
  for (const row of approximateRoutes) {
    assert.match(
      row.primaryQueryFamily,
      /\b(?:approximately|toward)\b/i,
      `${row.route}: target-size query must disclose approximation`,
    );
  }

  const frames = englishTools.find((row) => row.route.includes("extract-frames-from-video"));
  assert.ok(frames);
  assert.match([frames.primaryQueryFamily, ...frames.supportingQueries].join(" "), /interval/i);
  assert.doesNotMatch([frames.primaryQueryFamily, ...frames.supportingQueries].join(" "), /every frame/i);
});
