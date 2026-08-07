import assert from "node:assert/strict";
import test from "node:test";

import { selectModel, writeMask, applyAlpha } from "../src/engine/composite.mjs";
import { DEFAULT_MODEL, MODELS } from "../src/engine/model-config.mjs";

test("selectModel defaults to the shipped model", () => {
  assert.equal(selectModel(), MODELS[DEFAULT_MODEL]);
  assert.equal(selectModel(undefined), MODELS.u2netp);
});

test("selectModel returns the requested model, not the default", () => {
  assert.equal(selectModel("isnet"), MODELS.isnet);
  assert.equal(selectModel("isnet").size, 1024);
});

test("selectModel throws a named error for an unknown model", () => {
  // Without this the caller gets "Cannot read properties of undefined
  // (reading 'file')" from deep inside session loading.
  assert.throws(() => selectModel("nope"), /unknown background-removal model: nope/);
});

test("writeMask expands one channel into opaque grayscale RGBA", () => {
  const out = writeMask(new Uint8ClampedArray([0, 128, 255]), new Uint8ClampedArray(12));
  assert.deepEqual(Array.from(out), [
    0, 0, 0, 255,
    128, 128, 128, 255,
    255, 255, 255, 255
  ]);
});

test("writeMask keeps the mask opaque so the canvas resamples value, not alpha", () => {
  // If alpha were left at 0 the browser would premultiply the upscale toward
  // zero and every mask would come back empty.
  const out = writeMask(new Uint8ClampedArray([7, 9]), new Uint8ClampedArray(8));
  assert.equal(out[3], 255);
  assert.equal(out[7], 255);
});

test("applyAlpha reads the mask's red channel into the image's alpha", () => {
  const rgba = new Uint8ClampedArray([10, 20, 30, 255, 40, 50, 60, 255]);
  const mask = new Uint8ClampedArray([0, 0, 0, 255, 200, 200, 200, 255]);
  applyAlpha(rgba, mask, 2);
  assert.deepEqual(Array.from(rgba), [10, 20, 30, 0, 40, 50, 60, 200]);
});

test("applyAlpha preserves RGB of removed pixels to avoid edge fringing", () => {
  const rgba = new Uint8ClampedArray([200, 100, 50, 255]);
  applyAlpha(rgba, new Uint8ClampedArray([0, 0, 0, 255]), 1);
  assert.deepEqual(Array.from(rgba).slice(0, 3), [200, 100, 50]);
});

test("applyAlpha touches only the pixel count it is given", () => {
  const rgba = new Uint8ClampedArray([1, 1, 1, 255, 2, 2, 2, 255]);
  applyAlpha(rgba, new Uint8ClampedArray([9, 0, 0, 255, 9, 0, 0, 255]), 1);
  assert.equal(rgba[3], 9);
  assert.equal(rgba[7], 255, "the second pixel was outside the requested range");
});
