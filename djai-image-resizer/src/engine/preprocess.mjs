// Converts resized RGBA bytes into the channel-first float tensor the
// segmentation models expect. U^2-Net scales by the image's own maximum
// value before applying ImageNet mean/std; ISNet uses a flat /255.
export const toTensor = (rgba, size, model) => {
  const pixels = size * size;
  const tensor = new Float32Array(pixels * 3);

  let max = 0;
  if (model.scaleByMax) {
    for (let i = 0; i < pixels; i += 1) {
      const o = i * 4;
      if (rgba[o] > max) max = rgba[o];
      if (rgba[o + 1] > max) max = rgba[o + 1];
      if (rgba[o + 2] > max) max = rgba[o + 2];
    }
  }
  const divisor = model.scaleByMax ? (max || 255) : 255;

  for (let i = 0; i < pixels; i += 1) {
    const o = i * 4;
    tensor[i]              = (rgba[o]     / divisor - model.mean[0]) / model.std[0];
    tensor[pixels + i]     = (rgba[o + 1] / divisor - model.mean[1]) / model.std[1];
    tensor[pixels * 2 + i] = (rgba[o + 2] / divisor - model.mean[2]) / model.std[2];
  }
  return tensor;
};
