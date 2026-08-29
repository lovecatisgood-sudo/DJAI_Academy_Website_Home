import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";

const rootDir = new URL("..", import.meta.url).pathname;
const runDependencyAudit = process.env.DJAI_RUN_NPM_AUDIT === "1";

const projects = [
  {
    name: "DJAI homepage",
    dir: "djai-academy-homepage",
    runtime: true,
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
    name: "DJAI web development promo and voice agent",
    dir: "djai-web-promo-voice",
    runtime: true,
    install: "ci",
    build: ["run", "next:build"],
    clean: [".next"],
    outputs: [
      ".next/BUILD_ID",
      "public/assets/css/styles.css",
      "public/assets/js/promo.js",
      "public/djai-voice-widget.js"
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
      "out/vi/index.html",
      "out/detail/index.html",
      "out/detail/en/index.html",
      "out/detail/vi/index.html",
      "out/assets/DJAI-logo-small.webp",
      "out/assets/Instructor-DJAI-display.webp"
    ]
  },
  {
    name: "DJAI QR generator",
    dir: "DJayTools-Free-QR-Generator-Source",
    install: "ci",
    build: ["run", "build:app"],
    outputs: [
      "out/index.html", "out/en/index.html",
      ...["url-qr-code-generator", "wifi-qr-code-generator", "vcard-qr-code-generator", "text-qr-code-generator", "email-qr-code-generator", "whatsapp-qr-code-generator", "qr-code-generator-with-logo"].flatMap((tool) => [`out/${tool}/index.html`, `out/${tool}/en/index.html`]),
      "out/djai-academy-logo-display.webp", "out/siamese-cat-dev-logo.webp"
    ]
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
      "public/remove-background-image/index.html",
      "public/remove-background-image/en/index.html",
      "public/resize-image-to-200kb/index.html",
      "public/resize-image-to-200kb/en/index.html",
      "public/avif-to-jpg/index.html",
      "public/avif-to-jpg/en/index.html",
      "public/avif-to-png/index.html",
      "public/avif-to-png/en/index.html",
      "public/passport-photo-resizer/index.html",
      "public/passport-photo-resizer/en/index.html",
      "public/assets/djai-academy-logo.webp",
      "public/assets/siamese-cat-dev-transparent.webp",
      "public/vendor/background-removal.mjs",
      "public/vendor/heic2any.min.js",
      "public/vendor/jszip.min.js",
      "public/vendor/models/u2netp.onnx",
      "public/vendor/ort/ort-wasm-simd-threaded.wasm"
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
      "out/png-to-pdf/index.html",
      "out/png-to-pdf/en/index.html",
      "out/webp-to-pdf/index.html",
      "out/webp-to-pdf/en/index.html",
      "out/pdf-to-png/index.html",
      "out/pdf-to-png/en/index.html",
      "out/extract-pdf-pages/index.html",
      "out/extract-pdf-pages/en/index.html",
      "out/delete-pages-from-pdf/index.html",
      "out/delete-pages-from-pdf/en/index.html",
      "out/reorder-pdf-pages/index.html",
      "out/reorder-pdf-pages/en/index.html",
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
    name: "DJAI media tools",
    dir: "djai-media-tools",
    install: "ci",
    build: ["run", "build"],
    clean: ["public"],
    outputs: [
      "public/index.html", "public/en/index.html", "public/mp3-to-wav/index.html",
      "public/mp3-to-wav/en/index.html", "public/compress-video/index.html",
      "public/compress-video/en/index.html", "public/video-converter/index.html",
      "public/video-cutter/en/index.html", "public/extract-frames-from-video/en/index.html",
      "public/video-tools.js", "public/video-tools.css",
      "public/vendor/jszip/jszip.min.js", "public/vendor/core/ffmpeg-core.wasm",
      "public/vendor/ffmpeg/worker.js"
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
    outputs: [
      "dist/index.html",
      "dist/en/index.html",
      "dist/course/index.html",
      "dist/course/th/index.html",
      "dist/courses/index.html",
      "dist/courses/build-first-app/index.html",
      "dist/courses/make-a-game/index.html",
      "dist/courses/coding-with-ai/index.html",
      "dist/djai-academy-logo.webp",
      "dist/siamese-cat-dev-logo.webp"
    ]
  }
];

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(" ")} (${cwd})`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: false,
    env: command === "npm" ? npmEnvironment() : process.env
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

// npm 12 treats a user-level `allow-scripts` setting as a project-scoped
// install policy. A deployment build must not inherit an unrelated developer
// workstation policy, so use project configuration plus npm defaults unless a
// caller deliberately supplied a user config to this build.
function npmEnvironment() {
  const environment = { ...process.env };
  delete environment.npm_config_allow_scripts;
  delete environment.NPM_CONFIG_ALLOW_SCRIPTS;

  // `npm run` itself exports a lower-case npm_config_userconfig even when the
  // caller did not explicitly choose one. Treat only the upper-case variable
  // as deliberate input so the parent npm process cannot leak its user config.
  if (process.env.NPM_CONFIG_USERCONFIG) {
    environment.npm_config_userconfig = process.env.NPM_CONFIG_USERCONFIG;
    return environment;
  }
  environment.NPM_CONFIG_USERCONFIG = "/dev/null";
  environment.npm_config_userconfig = "/dev/null";
  return environment;
}

function ensureDependencies(project) {
  const cwd = join(rootDir, project.dir);
  const nodeModules = join(cwd, "node_modules");
  const lockfile = join(cwd, "package-lock.json");
  const manifest = existsSync(lockfile) ? lockfile : join(cwd, "package.json");
  const marker = join(nodeModules, ".djai-dependency-fingerprint");
  const fingerprint = createHash("sha256").update(readFileSync(manifest)).digest("hex");

  if (existsSync(nodeModules)) {
    const fingerprintMatches = existsSync(marker) && readFileSync(marker, "utf8").trim() === fingerprint;
    const dependencyCheck = spawnSync("npm", ["ls", "--depth=0"], {
      cwd,
      stdio: "ignore",
      env: npmEnvironment()
    });

    if (dependencyCheck.status === 0 && (fingerprintMatches || !existsSync(marker))) {
      writeFileSync(marker, `${fingerprint}\n`);
      return;
    }
  }

  const installCommand = project.install === "ci" && existsSync(lockfile)
    ? ["ci"]
    : ["install"];

  run("npm", installCommand, cwd);
  writeFileSync(marker, `${fingerprint}\n`);
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

  for (const relativePath of ["out/vi/index.html", "out/detail/vi/index.html"]) {
    const outputPath = join(rootDir, project.dir, relativePath);
    const html = readFileSync(outputPath, "utf8");
    const updatedHtml = html.replace('<html lang="th">', '<html lang="vi">');
    if (updatedHtml === html) {
      throw new Error(`DJAI course could not set Vietnamese document language: ${relativePath}`);
    }
    writeFileSync(outputPath, updatedHtml);
  }

  for (const [locale, segment] of [["zh-CN", "zh-cn"], ["zh-TW", "zh-tw"]]) {
    for (const relativePath of [`out/${segment}/index.html`, `out/detail/${segment}/index.html`]) {
      const outputPath = join(rootDir, project.dir, relativePath);
      const html = readFileSync(outputPath, "utf8");
      const updatedHtml = html.replace('<html lang="th">', `<html lang="${locale}">`);
      if (updatedHtml === html) {
        throw new Error(`DJAI course could not set ${locale} document language: ${relativePath}`);
      }
      writeFileSync(outputPath, updatedHtml);
    }
  }
}

function prepareRuntimeArtifact(project) {
  const cwd = join(rootDir, project.dir);
  const nodeModules = join(cwd, "node_modules");
  const nextBuild = join(cwd, ".next");

  if (project.runtime) {
    const standaloneDir = join(nextBuild, "standalone");
    const tracedNodeModules = join(standaloneDir, "node_modules");
    if (!existsSync(join(tracedNodeModules, "next", "package.json"))) {
      throw new Error(`${project.name} did not generate a self-contained Next.js standalone runtime`);
    }

    // The generated standalone server contains exactly the dependencies traced
    // by Next.js. Keep it intact and remove the multi-GB build dependency tree.
    // Static and public assets are copied beside the standalone server because
    // Next intentionally leaves them out of that directory.
    rmSync(join(standaloneDir, "public"), { recursive: true, force: true });
    cpSync(join(cwd, "public"), join(standaloneDir, "public"), { recursive: true });
    rmSync(join(standaloneDir, ".next", "static"), { recursive: true, force: true });
    cpSync(join(nextBuild, "static"), join(standaloneDir, ".next", "static"), { recursive: true });
    rmSync(nodeModules, { recursive: true, force: true });
    rmSync(join(nextBuild, "cache"), { recursive: true, force: true });
    return;
  }

  rmSync(nodeModules, { recursive: true, force: true });
  rmSync(nextBuild, { recursive: true, force: true });
}

ensureDependencies(projects[0]);
run("node", ["scripts/optimize-site-images.mjs"], rootDir);

for (const project of projects) {
  const cwd = join(rootDir, project.dir);
  ensureDependencies(project);
  if (runDependencyAudit) {
    run("npm", ["audit", "--audit-level=low"], cwd);
  }
  cleanBuildOutputs(project);
  run("npm", project.build, cwd);
  validateOutputs(project);
  setCourseExportLanguages(project);
  prepareRuntimeArtifact(project);
}

console.log("\nHostinger build completed. Start with: npm start");
