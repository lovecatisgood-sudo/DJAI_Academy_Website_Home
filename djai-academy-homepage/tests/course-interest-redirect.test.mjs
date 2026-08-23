import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("expired course campaign URL hands off to the evergreen interest form", () => {
  const source = readFileSync(join(root, "app", "MONEY_MAKING_PRODUCT", "page.jsx"), "utf8");
  assert.match(source, /\/siamese_cat\/dev\/course\/#course-interest/);
  assert.doesNotMatch(source, /money-making-product-2026-08-22|school\.djai\.academy\/signup/);
});
