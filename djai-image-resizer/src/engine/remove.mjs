// Import the wasm-only build: the site is not cross-origin isolated, so the
// WebGPU/WebGL execution providers would never be used and only add payload.
import * as ort from "onnxruntime-web/wasm";
import { toTensor } from "./preprocess.mjs";
import { toMask } from "./postprocess.mjs";
import { selectModel, writeMask, applyAlpha } from "./composite.mjs";

const assetBase = () => new URL("vendor/", document.baseURI).toString();

// SharedArrayBuffer is unavailable without cross-origin isolation, so threads
// would silently fall back anyway. Ask for one up front to skip the warning.
ort.env.wasm.numThreads = 1;
ort.env.wasm.simd = true;

// Keyed by model file: caching a single session would hand an isnet request
// the 320x320 u2netp session and fail on tensor shape.
const sessions = new Map();

const loadSession = (model, onProgress) => {
  const cached = sessions.get(model.file);
  if (cached) return cached;
  ort.env.wasm.wasmPaths = `${assetBase()}ort/`;
  const sessionPromise = (async () => {
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
    sessions.delete(model.file);
    throw error;
  });
  sessions.set(model.file, sessionPromise);
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

// Zeroing the dimensions drops the backing store immediately instead of
// waiting for GC. A 12 MP photo holds ~48 MB per full-size canvas, and a batch
// runs up to 20 images back to back.
const release = (...canvases) => {
  for (const canvas of canvases) {
    if (!canvas) continue;
    canvas.width = 0;
    canvas.height = 0;
  }
};

export const remove = async (image, options = {}) => {
  const model = selectModel(options.model);
  const session = await loadSession(model, options.progress);
  const bitmap = await createImageBitmap(image);
  let smallCanvas = null;
  let maskCanvas = null;
  let scaledMaskCanvas = null;
  let outCanvas = null;

  try {
    // 1. Resize to the model's input square and normalize into a tensor.
    const small = drawToSize(bitmap, model.size, model.size);
    smallCanvas = small.canvas;
    const rgba = small.ctx.getImageData(0, 0, model.size, model.size).data;
    const tensor = new ort.Tensor("float32", toTensor(rgba, model.size, model), [1, 3, model.size, model.size]);
    release(smallCanvas);

    // 2. Run inference. U^2-Net exposes several side outputs; d0 is first.
    const outputs = await session.run({ [session.inputNames[0]]: tensor });
    const mask = toMask(outputs[session.outputNames[0]].data);

    // 3. Paint the mask so the canvas resamples it back to full size for us.
    maskCanvas = document.createElement("canvas");
    maskCanvas.width = model.size;
    maskCanvas.height = model.size;
    const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
    const maskImage = maskCtx.createImageData(model.size, model.size);
    writeMask(mask, maskImage.data);
    maskCtx.putImageData(maskImage, 0, 0);

    // 4. Composite the upscaled mask into the original's alpha channel.
    const out = drawToSize(bitmap, bitmap.width, bitmap.height);
    outCanvas = out.canvas;
    const full = out.ctx.getImageData(0, 0, bitmap.width, bitmap.height);
    const scaledMask = drawToSize(maskCanvas, bitmap.width, bitmap.height);
    scaledMaskCanvas = scaledMask.canvas;
    const scaled = scaledMask.ctx.getImageData(0, 0, bitmap.width, bitmap.height).data;
    applyAlpha(full.data, scaled, bitmap.width * bitmap.height);
    out.ctx.putImageData(full, 0, 0);
    release(maskCanvas, scaledMaskCanvas);

    return await new Promise((resolve, reject) => {
      outCanvas.toBlob((blob) => {
        release(outCanvas);
        blob ? resolve(blob) : reject(new Error("encode failed"));
      }, "image/png");
    });
  } catch (error) {
    release(smallCanvas, maskCanvas, scaledMaskCanvas, outCanvas);
    throw error;
  } finally {
    bitmap.close?.();
  }
};
