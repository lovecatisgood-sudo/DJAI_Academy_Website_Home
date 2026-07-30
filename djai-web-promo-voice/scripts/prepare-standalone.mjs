import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname } from "node:path";

function copyDirectory(source, destination) {
  if (!existsSync(source)) {
    return;
  }

  mkdirSync(dirname(destination), { recursive: true });
  rmSync(destination, { recursive: true, force: true });
  cpSync(source, destination, { recursive: true });
}

if (!existsSync(".next/standalone/server.js")) {
  console.error("Missing .next/standalone/server.js. Run next build first.");
  process.exit(1);
}

copyDirectory("public", ".next/standalone/public");
copyDirectory(".next/static", ".next/standalone/.next/static");

console.log("Standalone assets prepared.");
