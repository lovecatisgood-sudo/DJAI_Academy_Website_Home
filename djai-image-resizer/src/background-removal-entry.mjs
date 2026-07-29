import { removeBackground } from "@imgly/background-removal";

const remove = (image, options = {}) => removeBackground(image, {
  model: "isnet_quint8",
  device: "cpu",
  output: {
    format: "image/png",
    quality: 0.92,
    type: "foreground"
  },
  ...options
});

export { remove };
