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
    outputs: [".next/BUILD_ID"]
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
      "out/detail/en/index.html"
    ]
  },
  {
    name: "DJAI QR generator",
    dir: "DJayTools-Free-QR-Generator-Source",
    install: "ci",
    build: ["run", "build:app"],
    outputs: ["out/index.html", "out/en/index.html"]
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
      "out/protect-pdf/index.html",
      "out/protect-pdf/en/index.html",
      "out/pdf.worker.min.mjs"
    ]
  },
  {
    name: "Siamese Cat Dev bio",
    dir: "Siamese-Cat-Dev-Bio-Site",
    install: "ci",
    build: ["run", "build"],
    outputs: ["dist/index.html", "dist/en/index.html"]
  }
];

const staticProjects = [
  {
    name: "DJAI image resizer",
    dir: "djai-image-resizer",
    outputs: ["public/index.html", "public/en/index.html", "public/app.js", "public/styles.css"]
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

for (const project of projects) {
  const cwd = join(rootDir, project.dir);
  ensureDependencies(project);
  cleanBuildOutputs(project);
  run("npm", project.build, cwd);
  validateOutputs(project);
  setCourseExportLanguages(project);
}

for (const project of staticProjects) {
  validateOutputs(project);
}

console.log("\nHostinger build completed. Start with: npm start");
