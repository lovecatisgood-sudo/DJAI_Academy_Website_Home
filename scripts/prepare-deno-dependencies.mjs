import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const rootDir = new URL("..", import.meta.url).pathname;
const projectDirs = [
  "djai-academy-homepage",
  "djai-web-promo-voice",
  "djai-academy-course",
  "DJayTools-Free-QR-Generator-Source",
  "djai-image-resizer",
  "djai-pdf-tools",
  "djai-media-tools",
  "djai-document-tools",
  "Siamese-Cat-Dev-Bio-Site",
];
const concurrency = 4;
let nextProject = 0;

function npmEnvironment() {
  const environment = { ...process.env };
  delete environment.npm_config_allow_scripts;
  delete environment.NPM_CONFIG_ALLOW_SCRIPTS;
  environment.NPM_CONFIG_USERCONFIG = "/dev/null";
  environment.npm_config_userconfig = "/dev/null";
  return environment;
}

function install(projectDir) {
  const cwd = join(rootDir, projectDir);
  const command = existsSync(join(cwd, "package-lock.json")) ? ["ci"] : ["install"];

  return new Promise((resolve, reject) => {
    console.log(`\n> npm ${command.join(" ")} (${cwd})`);
    const child = spawn("npm", command, {
      cwd,
      stdio: "inherit",
      shell: false,
      env: npmEnvironment(),
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`Dependency install failed for ${projectDir} (${code ?? signal})`));
    });
  });
}

async function worker() {
  while (nextProject < projectDirs.length) {
    const projectDir = projectDirs[nextProject++];
    await install(projectDir);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
console.log("\nDeno dependency preparation completed.");
