import { existsSync, statSync } from "node:fs";

const requiredFiles = [
  ".next/standalone/server.js",
  ".next/standalone/public/djai-voice-widget.js",
];

const requiredDirectories = [
  ".next/standalone/.next/static",
];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

for (const file of requiredFiles) {
  if (!existsSync(file) || !statSync(file).isFile()) {
    fail(`Missing standalone file: ${file}`);
  }
}

for (const directory of requiredDirectories) {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    fail(`Missing standalone directory: ${directory}`);
  }
}

if (!process.exitCode) {
  console.log("Standalone artifact verified.");
}
