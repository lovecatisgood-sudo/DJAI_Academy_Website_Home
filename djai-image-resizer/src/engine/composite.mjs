// The pixel work from remove.mjs, kept free of onnxruntime and the DOM so it
// can be tested directly in Node the way preprocess/postprocess already are.
import { MODELS, DEFAULT_MODEL } from "./model-config.mjs";

export const selectModel = (name = DEFAULT_MODEL) => {
  const model = MODELS[name];
  if (!model) throw new Error(`unknown background-removal model: ${name}`);
  return model;
};

// Expand a single-channel mask into an opaque grayscale RGBA buffer, so the
// canvas can resample it back up to the source image's dimensions for us.
export const writeMask = (mask, target) => {
  for (let i = 0; i < mask.length; i += 1) {
    const o = i * 4;
    target[o] = target[o + 1] = target[o + 2] = mask[i];
    target[o + 3] = 255;
  }
  return target;
};

// Move the upscaled mask into the source image's alpha channel. Only alpha is
// touched: the RGB of a removed pixel is preserved, which keeps the edge from
// fringing when the PNG is composited over a new background.
export const applyAlpha = (rgba, maskRgba, pixels) => {
  for (let i = 0; i < pixels; i += 1) {
    rgba[i * 4 + 3] = maskRgba[i * 4];
  }
  return rgba;
};
