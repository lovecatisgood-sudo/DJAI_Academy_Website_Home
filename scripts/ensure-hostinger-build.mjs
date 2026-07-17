import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = new URL("..", import.meta.url).pathname;

const requiredOutputs = [
  "djai-academy-homepage/.next/BUILD_ID",
  "djai-academy-course/out/index.html",
  "djai-academy-course/out/en/index.html",
  "DJayTools-Free-QR-Generator-Source/out/index.html",
  "DJayTools-Free-QR-Generator-Source/out/en/index.html",
  "djai-pdf-tools/out/index.html",
  "djai-pdf-tools/out/en/index.html",
  "djai-pdf-tools/out/protect-pdf/index.html",
  "djai-pdf-tools/out/pdf.worker.min.mjs",
  "Siamese-Cat-Dev-Bio-Site/dist/index.html",
  "Siamese-Cat-Dev-Bio-Site/dist/en/index.html",
  "djai-image-resizer/public/index.html",
  "djai-image-resizer/public/en/index.html"
];

const missingOutput = requiredOutputs.find((output) => !existsSync(join(rootDir, output)));

if (!missingOutput) {
  process.exit(0);
}

console.log(`Missing build output: ${missingOutput}`);
console.log("Running Hostinger build before start.");

const result = spawnSync("node", ["scripts/build-hostinger.mjs"], {
  cwd: rootDir,
  stdio: "inherit",
  shell: false
});

process.exit(result.status || 0);
