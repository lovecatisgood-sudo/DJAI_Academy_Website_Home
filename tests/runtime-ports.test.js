const assert = require("node:assert/strict");
const test = require("node:test");

const { deriveInternalPorts, resolveInternalPorts } = require("../runtime-ports");

test("adjacent deployment processes receive non-overlapping child ports", () => {
  const first = deriveInternalPorts(918_528);
  const second = deriveInternalPorts(918_529);
  assert.equal(new Set([...Object.values(first), ...Object.values(second)]).size, 4);
});

test("explicit internal-port overrides remain supported", () => {
  assert.deepEqual(resolveInternalPorts({
    processId: 42,
    rootPort: 31_147,
    homepageOverride: "31148",
    voicePromoOverride: "31149"
  }), { homepagePort: 31_148, voicePromoPort: 31_149 });
});

test("public and child ports cannot conflict", () => {
  assert.throws(() => resolveInternalPorts({
    processId: 42,
    rootPort: 31_147,
    homepageOverride: "31147",
    voicePromoOverride: "31149"
  }), /conflicts with the public application port/);
});
