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

const withPixels = (size, pixels) => {
  const data = new Uint8ClampedArray(size * size * 4);
  for (let i = 0; i < pixels.length; i += 1) {
    const [idx, r, g, b] = pixels[i];
    data[idx * 4] = r;
    data[idx * 4 + 1] = g;
    data[idx * 4 + 2] = b;
    data[idx * 4 + 3] = 255;
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

test("scaleByMax scans all pixels, not just the first one", () => {
  // Pixel 0: (10, 10, 10), Pixel 3: (200, 180, 90). Brightest is 200.
  const model = MODELS.u2netp;
  const rgba = withPixels(2, [
    [0, 10, 10, 10],
    [3, 200, 180, 90]
  ]);
  const tensor = toTensor(rgba, 2, model);
  // Brightest pixel (index 3) red channel: (200/200 - 0.485) / 0.229
  const expectedBrightestR = (1 - model.mean[0]) / model.std[0];
  assert.ok(Math.abs(tensor[3] - expectedBrightestR) < 1e-5, `brightest pixel red: ${tensor[3]} vs ${expectedBrightestR}`);
});

test("planes are not swapped (distinct channel values per plane)", () => {
  // All pixels (200, 100, 50) with isnet (mean=0.5, std=1, no scaleByMax).
  // Expected: R = (200/255 - 0.5) / 1 ≈ 0.28431
  //           G = (100/255 - 0.5) / 1 ≈ -0.10784
  //           B = (50/255 - 0.5) / 1 ≈ -0.30392
  const tensor = toTensor(solid(2, 200, 100, 50), 2, MODELS.isnet);
  const plane = 4; // 2*2
  const expectedR = (200 / 255 - 0.5) / 1;
  const expectedG = (100 / 255 - 0.5) / 1;
  const expectedB = (50 / 255 - 0.5) / 1;
  assert.ok(Math.abs(tensor[0] - expectedR) < 1e-5, `R plane pixel 0: ${tensor[0]} vs ${expectedR}`);
  assert.ok(Math.abs(tensor[plane] - expectedG) < 1e-5, `G plane pixel 0: ${tensor[plane]} vs ${expectedG}`);
  assert.ok(Math.abs(tensor[plane * 2] - expectedB) < 1e-5, `B plane pixel 0: ${tensor[plane * 2]} vs ${expectedB}`);
});
