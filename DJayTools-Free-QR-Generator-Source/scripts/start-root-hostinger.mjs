import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const qrDirectory = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repositoryRoot = path.dirname(qrDirectory);
const rootServer = path.join(repositoryRoot, "server.js");
const ensureBuildScript = path.join(repositoryRoot, "scripts", "ensure-hostinger-build.mjs");

if (existsSync(rootServer) && existsSync(ensureBuildScript)) {
  const result = spawnSync(process.execPath, [ensureBuildScript], {
    cwd: repositoryRoot,
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }

  process.chdir(repositoryRoot);
  await import(pathToFileURL(rootServer));
} else {
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(npmCommand, ["run", "start:standalone"], {
    cwd: qrDirectory,
    stdio: "inherit",
    shell: false
  });
  process.exit(result.status || 0);
}
