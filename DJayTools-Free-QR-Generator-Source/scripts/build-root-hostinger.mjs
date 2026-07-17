import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const qrDirectory = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repositoryRoot = path.dirname(qrDirectory);
const rootBuildScript = path.join(repositoryRoot, "scripts", "build-hostinger.mjs");

const command = existsSync(rootBuildScript)
  ? [process.execPath, [rootBuildScript], repositoryRoot]
  : [process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build:app"], qrDirectory];

const result = spawnSync(command[0], command[1], {
  cwd: command[2],
  stdio: "inherit",
  shell: false
});

process.exit(result.status || 0);
