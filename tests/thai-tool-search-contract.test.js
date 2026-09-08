const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const ownership = JSON.parse(
  readFileSync(path.join(root, "data/seo/keyword-ownership.json"), "utf8"),
);

const thaiTools = ownership.entries.filter(
  (row) => row.locale === "th" && row.indexable && row.pageRole === "working_tool",
);

function normalize(query) {
  return query.trim().toLocaleLowerCase("th").replace(/[\s\p{P}\p{S}]+/gu, " ").trim();
}

test("all Thai working tools own a researched query set", () => {
  assert.equal(thaiTools.length, 92, "Thai tool inventory changed; review query ownership");

  const primaryOwners = new Map();
  for (const row of thaiTools) {
    const primary = normalize(row.primaryQueryFamily);
    assert.ok(primary.length >= 14, `${row.route}: primary query is too broad`);
    assert.equal(
      row.evidenceStatus,
      "directional_external",
      `${row.route}: current Thai SERP evidence is missing`,
    );
    assert.equal(
      row.evidenceSource,
      "feature_validation_and_live_thai_serp_review_2026-09-08",
      `${row.route}: evidence source must identify the Thai research pass`,
    );
    assert.equal(row.validatedAt, "2026-09-08", `${row.route}: stale validation date`);
    assert.ok(row.supportingQueries.length >= 3, `${row.route}: needs 3 supporting queries`);
    assert.equal(
      new Set(row.supportingQueries.map(normalize)).size,
      row.supportingQueries.length,
      `${row.route}: duplicate supporting query`,
    );
    assert.equal(primaryOwners.has(primary), false, `${row.route}: duplicate primary query`);
    primaryOwners.set(primary, row.route);
  }
});

test("Thai query families have one canonical owner", () => {
  const owners = new Map();
  for (const row of thaiTools) {
    for (const query of [row.primaryQueryFamily, ...row.supportingQueries]) {
      const family = normalize(query);
      const priorOwner = owners.get(family);
      assert.ok(
        !priorOwner || priorOwner === row.route,
        `${query}: assigned to both ${priorOwner} and ${row.route}`,
      );
      owners.set(family, row.route);
    }
  }
});

test("Thai target-size queries describe approximate output honestly", () => {
  const approximateRoutes = thaiTools.filter((row) =>
    /(?:image-to-(?:100|500)kb|resize-image-to-200kb|compress-video-to-(?:10|25|50|100)mb)/.test(row.route),
  );
  assert.equal(approximateRoutes.length, 7);
  for (const row of approximateRoutes) {
    assert.match(
      row.primaryQueryFamily,
      /ใกล้|ประมาณ/,
      `${row.route}: target-size query must disclose approximation`,
    );
  }

  const frames = thaiTools.find((row) => row.route.includes("extract-frames-from-video"));
  assert.ok(frames);
  assert.match([frames.primaryQueryFamily, ...frames.supportingQueries].join(" "), /ช่วงเวลา|interval/i);
  assert.doesNotMatch([frames.primaryQueryFamily, ...frames.supportingQueries].join(" "), /ทุกเฟรม/);
});

test("Thai query targets avoid unsupported promises", () => {
  for (const row of thaiTools) {
    const queries = [row.primaryQueryFamily, ...row.supportingQueries].join(" | ");
    assert.doesNotMatch(queries, /ไม่จำกัด(?:ขนาดไฟล์|ทุกอย่าง)/, `${row.route}: unsupported unlimited claim`);
    assert.doesNotMatch(queries, /เป๊ะ\s*\d+\s*(?:KB|MB)/i, `${row.route}: exact-size output is not guaranteed`);
    assert.doesNotMatch(queries, /ไม่เพี้ยน(?:เลย|แน่นอน)/, `${row.route}: perfect conversion claim`);
  }
});
