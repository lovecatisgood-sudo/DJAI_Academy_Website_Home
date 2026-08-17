export const FAVICON_SIZES = [16, 32, 48, 180, 192, 512] as const;
export const MAX_SOURCE_BYTES = 12 * 1024 * 1024;
export const MAX_SOURCE_DIMENSION = 8192;

export function buildIco(images: Array<{ size: number; bytes: Uint8Array }>): Blob {
  const headerSize = 6 + images.length * 16;
  const total = headerSize + images.reduce((sum, image) => sum + image.bytes.length, 0);
  const buffer = new ArrayBuffer(total);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, images.length, true);
  let offset = headerSize;
  images.forEach((image, index) => {
    const entry = 6 + index * 16;
    view.setUint8(entry, image.size >= 256 ? 0 : image.size);
    view.setUint8(entry + 1, image.size >= 256 ? 0 : image.size);
    view.setUint8(entry + 2, 0);
    view.setUint8(entry + 3, 0);
    view.setUint16(entry + 4, 1, true);
    view.setUint16(entry + 6, 32, true);
    view.setUint32(entry + 8, image.bytes.length, true);
    view.setUint32(entry + 12, offset, true);
    bytes.set(image.bytes, offset);
    offset += image.bytes.length;
  });
  return new Blob([buffer], { type: "image/x-icon" });
}

export function sanitizeSvg(source: string): string {
  if (/<!doctype|<!entity/i.test(source)) throw new Error("unsafe-svg");
  const document = new DOMParser().parseFromString(source, "image/svg+xml");
  if (document.querySelector("parsererror")) throw new Error("invalid-svg");
  const root = document.documentElement;
  if (root.tagName.toLowerCase() !== "svg") throw new Error("invalid-svg");
  root.querySelectorAll("script, foreignObject, iframe, object, embed, audio, video, style").forEach((node) => node.remove());
  root.querySelectorAll("*").forEach((element) => {
    for (const attribute of [...element.attributes]) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim();
      if (name.startsWith("on") || name === "style" || ((name === "href" || name.endsWith(":href")) && !value.startsWith("#"))) {
        element.removeAttribute(attribute.name);
      }
    }
  });
  return new XMLSerializer().serializeToString(root);
}

export function manifestJson(background: string) {
  return JSON.stringify({
    name: "Website",
    short_name: "Website",
    icons: [
      { src: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "/maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ],
    theme_color: background,
    background_color: background,
    display: "standalone"
  }, null, 2);
}

export const installSnippet = `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;
