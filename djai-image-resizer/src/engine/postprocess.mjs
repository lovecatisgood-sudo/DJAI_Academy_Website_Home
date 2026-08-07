// U^2-Net and ISNet emit an unbounded single-channel saliency map. The
// reference implementations rescale it to [0,1] by its own min and max
// before use; we do the same and quantize straight to 8-bit alpha.
export const toMask = (output) => {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < output.length; i += 1) {
    if (output[i] < min) min = output[i];
    if (output[i] > max) max = output[i];
  }
  const range = max - min;
  const mask = new Uint8ClampedArray(output.length);
  // A flat saliency map carries no subject/background distinction, so there is
  // nothing to normalize. Return a fully opaque mask: the user gets their image
  // back untouched rather than a silently blank, fully transparent PNG.
  if (range === 0) return mask.fill(255);
  for (let i = 0; i < output.length; i += 1) {
    mask[i] = Math.round(((output[i] - min) / range) * 255);
  }
  return mask;
};
