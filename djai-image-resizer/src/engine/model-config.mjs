export const MODELS = {
  // U^2-Net: divides by the image max, then applies ImageNet mean/std.
  u2netp: { file: "models/u2netp.onnx", size: 320, mean: [0.485, 0.456, 0.406], std: [0.229, 0.224, 0.225], scaleByMax: true },
  u2net:  { file: "models/u2net.onnx",  size: 320, mean: [0.485, 0.456, 0.406], std: [0.229, 0.224, 0.225], scaleByMax: true },
  // ISNet/DIS: plain (x/255 - 0.5) / 1.0 at 1024px.
  isnet:  { file: "models/isnet-general-use.onnx", size: 1024, mean: [0.5, 0.5, 0.5], std: [1, 1, 1], scaleByMax: false }
};

export const DEFAULT_MODEL = "u2netp";
