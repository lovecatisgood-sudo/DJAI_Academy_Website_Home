import assert from "node:assert/strict";
import test from "node:test";
import { toTensor } from "../src/engine/preprocess.mjs";
import { MODELS } from "../src/engine/model-config.mjs";

const solid = (size, r, g, b) => {
  const data = new Uint8ClampedArray(size * size * 4);
  for (let i = 0; i < size * size; i += 1) {
    data[i * 4] = r; data[i * 4 + 1] = g; data[i * 4 + 2] = b; data[i * 4 + 3] = 255;
  }
  return data;
};

test("produces a channel-first tensor of the right length", () => {
  const tensor = toTensor(solid(2, 255, 255, 255), 2, MODELS.u2netp);
  assert.equal(tensor.length, 3 * 2 * 2);
  assert.equal(tensor instanceof Float32Array, true);
});

test("u2netp: a pure white image maps to (1 - mean) / std per channel", () => {
  const model = MODELS.u2netp;
  const tensor = toTensor(solid(2, 255, 255, 255), 2, model);
  const plane = 2 * 2;
  for (let c = 0; c < 3; c += 1) {
    const expected = (1 - model.mean[c]) / model.std[c];
    assert.ok(Math.abs(tensor[c * plane] - expected) < 1e-5, `channel ${c}: ${tensor[c * plane]} vs ${expected}`);
  }
});

test("isnet: scaleByMax is off, so 255 maps to (1 - 0.5) / 1", () => {
  const tensor = toTensor(solid(2, 255, 255, 255), 2, MODELS.isnet);
  assert.ok(Math.abs(tensor[0] - 0.5) < 1e-5);
});

test("scaleByMax divides by the brightest channel value, not a constant 255", () => {
  // Brightest value present is 128, so u2netp normalizes against 128 -> 1.0.
  const tensor = toTensor(solid(2, 128, 128, 128), 2, MODELS.u2netp);
  const model = MODELS.u2netp;
  assert.ok(Math.abs(tensor[0] - (1 - model.mean[0]) / model.std[0]) < 1e-5);
});

test("channels are separated into contiguous planes", () => {
  const tensor = toTensor(solid(2, 255, 0, 0), 2, MODELS.isnet);
  const plane = 4;
  assert.ok(tensor[0] > tensor[plane], "red plane should exceed green plane");
  assert.equal(tensor[plane], tensor[plane * 2], "green and blue planes should match");
});
