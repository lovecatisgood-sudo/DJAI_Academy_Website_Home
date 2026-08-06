import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

import "./generate-seo-pages.mjs";
import { fetchModels } from "./fetch-models.mjs";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const vendorDir = join(projectDir, "public", "vendor");

mkdirSync(vendorDir, { recursive: true });
cpSync(join(projectDir, "node_modules", "heic2any", "dist", "heic2any.min.js"), join(vendorDir, "heic2any.min.js"));
cpSync(join(projectDir, "node_modules", "jszip", "dist", "jszip.min.js"), join(vendorDir, "jszip.min.js"));

await fetchModels();

// Only the plain SIMD wasm ships: the site is not cross-origin isolated, so the
// threaded/JSEP/JSPI variants (another ~63 MB) could never be used at runtime.
mkdirSync(join(vendorDir, "ort"), { recursive: true });
cpSync(
  join(projectDir, "node_modules", "onnxruntime-web", "dist", "ort-wasm-simd-threaded.wasm"),
  join(vendorDir, "ort", "ort-wasm-simd-threaded.wasm")
);

await build({
  entryPoints: [join(projectDir, "src", "background-removal-entry.mjs")],
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  minify: true,
  sourcemap: false,
  outfile: join(vendorDir, "background-removal.mjs")
});

console.log("DJAI Image Tools build completed.");
