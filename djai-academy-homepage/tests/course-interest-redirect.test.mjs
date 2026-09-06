import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("expired course campaign URL hands off directly to the School interest owner", () => {
  const source = readFileSync(join(root, "app", "MONEY_MAKING_PRODUCT", "page.jsx"), "utf8");
  assert.match(source, /https:\/\/school\.djai\.academy\/en\/learn\/live-vibe-coding/);
  assert.doesNotMatch(source, /\/siamese_cat\/dev\/course/);
  assert.doesNotMatch(source, /money-making-product-2026-08-22|school\.djai\.academy\/signup/);
});
