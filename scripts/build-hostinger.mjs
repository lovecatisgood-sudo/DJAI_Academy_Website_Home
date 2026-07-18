import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = new URL("..", import.meta.url).pathname;

const projects = [
  {
    name: "DJAI homepage",
    dir: "djai-academy-homepage",
    install: "ci",
    build: ["run", "build"],
    clean: [".next"],
    outputs: [
      ".next/BUILD_ID",
      "public/djai-logo-display.webp",
      "public/djai-logo-small.webp",
      "public/founder-djai-display.webp",
      "public/founder-djai-mobile.webp",
      "public/portfolio/optimized/websites/Siam_Silk_Road_Global_Logistic.webp"
    ]
  },
  {
    name: "DJAI course",
    dir: "djai-academy-course",
    install: "ci",
    build: ["run", "build"],
    outputs: [
      "out/index.html",
      "out/en/index.html",
      "out/detail/index.html",
      "out/detail/en/index.html",
      "out/assets/DJAI-logo-small.webp",
      "out/assets/Instructor-DJAI-display.webp"
    ]
  },
  {
    name: "DJAI QR generator",
    dir: "DJayTools-Free-QR-Generator-Source",
    install: "ci",
    build: ["run", "build:app"],
    outputs: ["out/index.html", "out/en/index.html", "out/djai-academy-logo-display.webp", "out/siamese-cat-dev-logo.webp"]
  },
  {
    name: "DJAI image tools",
    dir: "djai-image-resizer",
    install: "ci",
    build: ["run", "build"],
    outputs: [
      "public/index.html",
      "public/en/index.html",
      "public/jpg-to-png/index.html",
      "public/jpg-to-png/en/index.html",
      "public/heic-to-jpg/index.html",
      "public/heic-to-jpg/en/index.html",
      "public/remove-image-metadata/index.html",
      "public/remove-image-metadata/en/index.html",
      "public/assets/djai-academy-logo.webp",
      "public/assets/siamese-cat-dev-transparent.webp",
      "public/vendor/heic2any.min.js",
      "public/vendor/jszip.min.js"
    ]
  },
  {
    name: "DJAI PDF tools",
    dir: "djai-pdf-tools",
    install: "ci",
    build: ["run", "build"],
    clean: [".next", "out"],
    outputs: [
      "out/index.html",
      "out/en/index.html",
      "out/merge-pdf/index.html",
      "out/merge-pdf/en/index.html",
      "out/jpg-to-pdf/index.html",
      "out/jpg-to-pdf/en/index.html",
      "out/pdf-to-jpg/index.html",
      "out/pdf-to-jpg/en/index.html",
      "out/protect-pdf/index.html",
      "out/protect-pdf/en/index.html",
      "out/organize-pdf/index.html",
      "out/organize-pdf/en/index.html",
      "out/add-page-numbers/index.html",
      "out/add-page-numbers/en/index.html",
      "out/remove-pdf-metadata/index.html",
      "out/remove-pdf-metadata/en/index.html",
      "out/djai-academy-logo-display.webp",
      "out/djai-academy-logo-small.webp",
      "out/siamese-cat-dev-logo.webp",
      "out/pdf.worker.min.mjs"
    ]
  },
  {
    name: "DJAI document, AI, and spreadsheet tools",
    dir: "djai-document-tools",
    install: "ci",
    build: ["run", "build"],
    clean: [".next", "out"],
    outputs: [
      "out/document/index.html",
      "out/document/en/index.html",
      "out/document/docx-to-pdf/index.html",
      "out/document/docx-to-pdf/en/index.html",
      "out/document/ocr/index.html",
      "out/ai/token-counter/index.html",
      "out/ai/context-optimizer/en/index.html",
      "out/spreadsheet/csv-to-json/index.html",
      "out/spreadsheet/xlsx-to-csv/en/index.html",
      "out/document/pdf.worker.min.mjs",
      "out/document/ocr-runtime/worker.min.js",
      "out/document/ocr-data/eng.traineddata.gz",
      "out/document/ocr-data/tha.traineddata.gz",
      "out/djai-assets/djai-academy-logo.webp",
      "out/djai-assets/djai-academy-logo-display.webp",
      "out/djai-assets/djai-academy-logo-small.webp",
      "out/djai-assets/siamese-cat-dev-logo.webp"
    ]
  },
  {
    name: "Siamese Cat Dev bio",
    dir: "Siamese-Cat-Dev-Bio-Site",
    install: "ci",
    build: ["run", "build"],
    outputs: ["dist/index.html", "dist/en/index.html", "dist/djai-academy-logo.webp", "dist/siamese-cat-dev-logo.webp"]
  }
];

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(" ")} (${cwd})`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function ensureDependencies(project) {
  const cwd = join(rootDir, project.dir);
  const nodeModules = join(cwd, "node_modules");

  if (existsSync(nodeModules)) {
    return;
  }

  const installCommand = project.install === "ci" && existsSync(join(cwd, "package-lock.json"))
    ? ["ci"]
    : ["install"];

  run("npm", installCommand, cwd);
}

function cleanBuildOutputs(project) {
  for (const output of project.clean || []) {
    rmSync(join(rootDir, project.dir, output), { recursive: true, force: true });
  }
}

function validateOutputs(project) {
  for (const output of project.outputs) {
    const outputPath = join(rootDir, project.dir, output);
    if (!existsSync(outputPath)) {
      throw new Error(`${project.name} is missing expected build output: ${output}`);
    }
  }
}

function setCourseExportLanguages(project) {
  if (project.dir !== "djai-academy-course") return;

  for (const relativePath of ["out/en/index.html", "out/detail/en/index.html"]) {
    const outputPath = join(rootDir, project.dir, relativePath);
    const html = readFileSync(outputPath, "utf8");
    const updatedHtml = html.replace('<html lang="th">', '<html lang="en">');
    if (updatedHtml === html) {
      throw new Error(`DJAI course could not set English document language: ${relativePath}`);
    }
    writeFileSync(outputPath, updatedHtml);
  }
}

ensureDependencies(projects[0]);
run("node", ["scripts/optimize-site-images.mjs"], rootDir);

for (const project of projects) {
  const cwd = join(rootDir, project.dir);
  ensureDependencies(project);
  cleanBuildOutputs(project);
  run("npm", project.build, cwd);
  validateOutputs(project);
  setCourseExportLanguages(project);
}

console.log("\nHostinger build completed. Start with: npm start");
