import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

import "./generate-seo-pages.mjs";

const projectDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const vendorDir = join(projectDir, "public", "vendor");

mkdirSync(vendorDir, { recursive: true });
cpSync(join(projectDir, "node_modules", "heic2any", "dist", "heic2any.min.js"), join(vendorDir, "heic2any.min.js"));
cpSync(join(projectDir, "node_modules", "jszip", "dist", "jszip.min.js"), join(vendorDir, "jszip.min.js"));

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
