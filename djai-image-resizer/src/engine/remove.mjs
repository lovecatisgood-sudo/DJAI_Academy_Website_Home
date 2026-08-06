// Import the wasm-only build: the site is not cross-origin isolated, so the
// WebGPU/WebGL execution providers would never be used and only add payload.
import * as ort from "onnxruntime-web/wasm";
import { MODELS, DEFAULT_MODEL } from "./model-config.mjs";
import { toTensor } from "./preprocess.mjs";
import { toMask } from "./postprocess.mjs";

const assetBase = () => new URL("vendor/", document.baseURI).toString();

// SharedArrayBuffer is unavailable without cross-origin isolation, so threads
// would silently fall back anyway. Ask for one up front to skip the warning.
ort.env.wasm.numThreads = 1;
ort.env.wasm.simd = true;

let sessionPromise = null;

const loadSession = (model, onProgress) => {
  if (sessionPromise) return sessionPromise;
  ort.env.wasm.wasmPaths = `${assetBase()}ort/`;
  sessionPromise = (async () => {
    const response = await fetch(`${assetBase()}${model.file}`);
    if (!response.ok) throw new Error(`model ${response.status}`);
    const total = Number(response.headers.get("content-length")) || 0;
    const chunks = [];
    let loaded = 0;
    const reader = response.body.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      loaded += value.length;
      if (total) onProgress?.("fetch:model", loaded, total);
    }
    const buffer = new Uint8Array(loaded);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.length;
    }
    return ort.InferenceSession.create(buffer, { executionProviders: ["wasm"] });
  })().catch((error) => {
    sessionPromise = null;
    throw error;
  });
  return sessionPromise;
};

const drawToSize = (source, width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, width, height);
  return { canvas, ctx };
};

export const remove = async (image, options = {}) => {
  const model = MODELS[options.model || DEFAULT_MODEL];
  const session = await loadSession(model, options.progress);
  const bitmap = await createImageBitmap(image);

  try {
    // 1. Resize to the model's input square and normalize into a tensor.
    const { ctx: smallCtx } = drawToSize(bitmap, model.size, model.size);
    const rgba = smallCtx.getImageData(0, 0, model.size, model.size).data;
    const tensor = new ort.Tensor("float32", toTensor(rgba, model.size, model), [1, 3, model.size, model.size]);

    // 2. Run inference. U^2-Net exposes several side outputs; d0 is first.
    const outputs = await session.run({ [session.inputNames[0]]: tensor });
    const mask = toMask(outputs[session.outputNames[0]].data);

    // 3. Paint the mask so the canvas resamples it back to full size for us.
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = model.size;
    maskCanvas.height = model.size;
    const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
    const maskImage = maskCtx.createImageData(model.size, model.size);
    for (let i = 0; i < mask.length; i += 1) {
      const o = i * 4;
      maskImage.data[o] = maskImage.data[o + 1] = maskImage.data[o + 2] = mask[i];
      maskImage.data[o + 3] = 255;
    }
    maskCtx.putImageData(maskImage, 0, 0);

    // 4. Composite the upscaled mask into the original's alpha channel.
    const { canvas: outCanvas, ctx: outCtx } = drawToSize(bitmap, bitmap.width, bitmap.height);
    const full = outCtx.getImageData(0, 0, bitmap.width, bitmap.height);
    const { ctx: scaledMaskCtx } = drawToSize(maskCanvas, bitmap.width, bitmap.height);
    const scaled = scaledMaskCtx.getImageData(0, 0, bitmap.width, bitmap.height).data;
    for (let i = 0; i < bitmap.width * bitmap.height; i += 1) {
      full.data[i * 4 + 3] = scaled[i * 4];
    }
    outCtx.putImageData(full, 0, 0);

    return await new Promise((resolve, reject) => {
      outCanvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("encode failed"))), "image/png");
    });
  } finally {
    bitmap.close?.();
  }
};
