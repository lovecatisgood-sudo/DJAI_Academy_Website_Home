import assert from "node:assert/strict";
import test from "node:test";
import { MODELS, DEFAULT_MODEL } from "../src/engine/model-config.mjs";

test("default model is u2netp with U^2-Net preprocessing constants", () => {
  assert.equal(DEFAULT_MODEL, "u2netp");
  const model = MODELS[DEFAULT_MODEL];
  assert.equal(model.size, 320);
  assert.deepEqual(model.mean, [0.485, 0.456, 0.406]);
  assert.deepEqual(model.std, [0.229, 0.224, 0.225]);
  assert.equal(model.scaleByMax, true);
});

test("isnet fallback uses its own 1024px normalization", () => {
  const model = MODELS.isnet;
  assert.equal(model.size, 1024);
  assert.deepEqual(model.mean, [0.5, 0.5, 0.5]);
  assert.deepEqual(model.std, [1, 1, 1]);
  assert.equal(model.scaleByMax, false);
});
