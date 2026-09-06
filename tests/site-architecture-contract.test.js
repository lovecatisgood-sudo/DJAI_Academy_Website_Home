const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const architecture = JSON.parse(readFileSync(path.join(root, "data/seo/site-architecture.json"), "utf8"));
const routing = JSON.parse(readFileSync(path.join(root, "data/seo/acquisition-routing.json"), "utf8"));

test("main navigation has five non-competing destinations and one project action", () => {
  assert.equal(architecture.version, 1);
  assert.deepEqual(
    architecture.mainNavigation.map((item) => item.id),
    ["build", "tools", "cam_pdf", "school", "resources"],
  );
  assert.equal(new Set(architecture.mainNavigation.map((item) => item.primaryIntent)).size, 5);
  assert.equal(architecture.primaryAction.id, "project_enquiry");
  assert.equal(architecture.primaryAction.href, "mailto:contact@djai.academy");
  assert.equal(architecture.mainNavigation.find((item) => item.id === "school").property, "school");
  assert.equal(architecture.mainNavigation.find((item) => item.id === "cam_pdf").href, "/Cam_PDF_Scan_Signer_QR-Gen/");
});

test("page families have exactly one primary conversion", () => {
  const requiredFamilies = [
    "homepage",
    "development",
    "service",
    "portfolio",
    "tool_hub",
    "working_tool",
    "cam_pdf_product",
    "resource",
    "school_course_hub",
    "school_course",
  ];
  assert.deepEqual(Object.keys(architecture.pageFamilies), requiredFamilies);
  for (const [id, family] of Object.entries(architecture.pageFamilies)) {
    assert.equal(typeof family.primaryConversion, "string", `${id}: primaryConversion`);
    assert.ok(family.primaryConversion.length > 0, `${id}: primaryConversion`);
    assert.ok(Array.isArray(family.allowedSecondaryConversions), `${id}: secondary conversions`);
  }
});

test("all existing tool families have deterministic post-success ownership", () => {
  const expected = ["pdf", "qr", "document", "image", "media", "ai", "spreadsheet", "seo", "brand"];
  assert.deepEqual(Object.keys(architecture.toolFamilies), expected);
  for (const id of expected) {
    const family = architecture.toolFamilies[id];
    assert.equal(family.sequence[0], "task_result", `${id}: result must remain first`);
    assert.equal(family.sequence[1], "related_tool", `${id}: related tool must remain second`);
    assert.doesNotMatch(family.sequence.join(" "), /random|rotating/i, `${id}: deterministic sequence`);
  }
  assert.equal(architecture.toolFamilies.pdf.contextualBridge, "cam_pdf");
  assert.equal(architecture.toolFamilies.document.contextualBridge, "cam_pdf");
  assert.equal(architecture.toolFamilies.ai.contextualBridge, "development");
  assert.equal(architecture.toolFamilies.media.contextualBridge, "development");
});

test("the acquisition manifest uses only destinations defined by the architecture", () => {
  const validTargets = new Set(architecture.conversionTargets);
  for (const [cluster, rule] of Object.entries(routing.clusters)) {
    assert.equal(validTargets.has(rule.primary), true, `${cluster}: primary ${rule.primary}`);
    assert.equal(validTargets.has(rule.secondary), true, `${cluster}: secondary ${rule.secondary}`);
  }
});

test("the architecture encodes the minimal visual-change and migration safeguards", () => {
  assert.equal(architecture.visualPolicy, "preserve_components_and_styling");
  assert.equal(architecture.migrationPolicy.requireVerifiedTarget, true);
  assert.equal(architecture.migrationPolicy.requireOneToOneRedirect, true);
  assert.equal(architecture.migrationPolicy.allowHomepageFallback, false);
  assert.equal(architecture.migrationPolicy.minimumRedirectDays, 365);
});
