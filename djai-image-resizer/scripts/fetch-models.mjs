import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const vendorDir = join(projectDir, "public", "vendor");
const REMBG = "https://github.com/danielgatis/rembg/releases/download/v0.0.0";

// Weights: U^2-Net, Apache-2.0 (github.com/xuebinqin/U-2-Net).
// Mirrored by the MIT-licensed rembg project; the weights' own licence is Apache-2.0.
export const MODEL_SOURCES = [
  { name: "models/u2netp.onnx", url: `${REMBG}/u2netp.onnx`, bytes: 4574861, sha256: "309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8" }
];

const download = async (source) => {
  const target = join(vendorDir, source.name);
  mkdirSync(dirname(target), { recursive: true });
  if (existsSync(target)) {
    const digest = createHash("sha256").update(readFileSync(target)).digest("hex");
    if (digest === source.sha256) return;
  }
  const response = await fetch(source.url);
  if (!response.ok) throw new Error(`${source.url} -> HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const digest = createHash("sha256").update(buffer).digest("hex");
  if (process.env.DJAI_RECORD_CHECKSUMS === "1") {
    console.log(`${source.name}  bytes:${buffer.byteLength}  sha256:${digest}`);
  } else if (source.sha256 !== digest) {
    throw new Error(`checksum mismatch for ${source.name}: expected ${source.sha256}, got ${digest}`);
  }
  writeFileSync(target, buffer);
};

export const fetchModels = async () => {
  for (const source of MODEL_SOURCES) await download(source);
};

if (import.meta.url === `file://${process.argv[1]}`) await fetchModels();
