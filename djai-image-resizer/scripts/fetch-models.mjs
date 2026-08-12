import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const vendorDir = join(projectDir, "public", "vendor");
const sourceAssetDir = join(projectDir, "assets", "vendor");
const REMBG = "https://github.com/danielgatis/rembg/releases/download/v0.0.0";
const DOWNLOAD_ATTEMPTS = 4;

// Weights: U^2-Net, Apache-2.0 (github.com/xuebinqin/U-2-Net).
// Mirrored by the MIT-licensed rembg project; the weights' own licence is Apache-2.0.
export const MODEL_SOURCES = [
  { name: "models/u2netp.onnx", url: `${REMBG}/u2netp.onnx`, bytes: 4574861, sha256: "309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8" }
];

const validate = (path, source) => {
  if (!existsSync(path)) return false;
  const buffer = readFileSync(path);
  if (buffer.byteLength !== source.bytes) return false;
  return createHash("sha256").update(buffer).digest("hex") === source.sha256;
};

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const fetchWithRetry = async (source) => {
  let lastError;
  for (let attempt = 1; attempt <= DOWNLOAD_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(source.url, { signal: AbortSignal.timeout(60_000) });
      if (!response.ok) throw new Error(`${source.url} -> HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (attempt < DOWNLOAD_ATTEMPTS) {
        const delay = 1_000 * (2 ** (attempt - 1));
        console.warn(`Model download attempt ${attempt}/${DOWNLOAD_ATTEMPTS} failed; retrying in ${delay}ms.`);
        await wait(delay);
      }
    }
  }
  throw new Error(`Could not download ${source.name} after ${DOWNLOAD_ATTEMPTS} attempts.`, { cause: lastError });
};

const download = async (source) => {
  const target = join(vendorDir, source.name);
  mkdirSync(dirname(target), { recursive: true });
  if (validate(target, source)) return;

  const vendoredSource = join(sourceAssetDir, source.name);
  let buffer;
  if (validate(vendoredSource, source)) {
    buffer = readFileSync(vendoredSource);
  } else {
    if (existsSync(vendoredSource)) {
      throw new Error(`Vendored model failed size or checksum validation: ${vendoredSource}`);
    }
    console.warn(`Vendored model is missing; downloading fallback from ${source.url}`);
    buffer = await fetchWithRetry(source);
  }

  const digest = createHash("sha256").update(buffer).digest("hex");
  if (process.env.DJAI_RECORD_CHECKSUMS === "1") {
    console.log(`${source.name}  bytes:${buffer.byteLength}  sha256:${digest}`);
  } else if (source.bytes !== buffer.byteLength || source.sha256 !== digest) {
    throw new Error(`checksum mismatch for ${source.name}: expected ${source.sha256}, got ${digest}`);
  }
  const temporaryTarget = `${target}.tmp`;
  writeFileSync(temporaryTarget, buffer);
  renameSync(temporaryTarget, target);
};

export const fetchModels = async () => {
  for (const source of MODEL_SOURCES) await download(source);
};

if (import.meta.url === `file://${process.argv[1]}`) await fetchModels();
