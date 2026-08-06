import assert from "node:assert/strict";
import test from "node:test";
import { toMask } from "../src/engine/postprocess.mjs";

test("min-max normalizes the mask across its full range", () => {
  const mask = toMask(new Float32Array([0, 0.5, 1]));
  assert.deepEqual(Array.from(mask), [0, 128, 255]);
});

test("rescales an arbitrary range onto 0-255", () => {
  const mask = toMask(new Float32Array([2, 4, 6]));
  assert.deepEqual(Array.from(mask), [0, 128, 255]);
});

test("a flat mask does not divide by zero", () => {
  const mask = toMask(new Float32Array([0.7, 0.7, 0.7]));
  assert.deepEqual(Array.from(mask), [0, 0, 0]);
});

test("output length matches input length", () => {
  assert.equal(toMask(new Float32Array(1024)).length, 1024);
});
