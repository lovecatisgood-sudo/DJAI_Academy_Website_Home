import { existsSync, readFileSync } from "node:fs";

const archive = "djai-voice-agent-v1-source.zip";
const requiredEntries = [
  "README.md",
  "DEPLOYMENT.md",
  "ACCEPTANCE.md",
  "PROJECT_STATE.md",
  "DJAI_Voice_Agent_V1_Build_Spec.md",
  "DJAI_Voice_Admin_V1_5_PRD.md",
  "DJAI_Voice_Admin_V1_5_Architecture.md",
  "DJAI_Voice_Admin_V1_5_UIUX_Design.md",
  "DJAI_Voice_Admin_V1_5_Implementation_Plan.md",
  ".env.example",
  ".nvmrc",
  ".node-version",
  "package.json",
  "pnpm-workspace.yaml",
  "pnpm-lock.yaml",
  "scripts/migrate.mjs",
  "scripts/env-utils.mjs",
  "scripts/local-env.mjs",
  "scripts/verify-env.mjs",
  "scripts/verify-source.mjs",
  "scripts/verify-schema.mjs",
  "scripts/prepare-standalone.mjs",
  "scripts/verify-standalone.mjs",
  "scripts/smoke-public.mjs",
  "scripts/smoke-no-secrets.mjs",
  "src/app/api/session/route.ts",
  "src/app/api/lead/route.ts",
  "src/app/api/conversation/route.ts",
  "src/lib/prompt.ts",
  "public/djai-voice-widget.js",
];

if (!existsSync(archive)) {
  console.error(`Missing archive: ${archive}`);
  process.exit(1);
}

const data = readFileSync(archive);
const eocdSignature = 0x06054b50;
const centralDirectorySignature = 0x02014b50;
let eocdOffset = -1;

for (let index = data.length - 22; index >= 0; index -= 1) {
  if (data.readUInt32LE(index) === eocdSignature) {
    eocdOffset = index;
    break;
  }
}

if (eocdOffset === -1) {
  console.error("Archive does not contain a valid end-of-central-directory record.");
  process.exit(1);
}

const entryCount = data.readUInt16LE(eocdOffset + 10);
let cursor = data.readUInt32LE(eocdOffset + 16);
const entries = new Set();

for (let index = 0; index < entryCount; index += 1) {
  if (data.readUInt32LE(cursor) !== centralDirectorySignature) {
    console.error("Archive central directory is malformed.");
    process.exit(1);
  }

  const fileNameLength = data.readUInt16LE(cursor + 28);
  const extraLength = data.readUInt16LE(cursor + 30);
  const commentLength = data.readUInt16LE(cursor + 32);
  const fileNameStart = cursor + 46;
  const fileNameEnd = fileNameStart + fileNameLength;

  entries.add(data.subarray(fileNameStart, fileNameEnd).toString("utf8"));
  cursor = fileNameEnd + extraLength + commentLength;
}
const missing = requiredEntries.filter((entry) => !entries.has(entry));
const forbiddenEntries = [...entries].filter(
  (entry) =>
    entry === ".env" ||
    entry === ".env.local" ||
    entry.startsWith(".git/") ||
    entry.startsWith(".next/") ||
    entry.startsWith("node_modules/"),
);

if (missing.length) {
  console.error(`Archive is missing required entries: ${missing.join(", ")}`);
  process.exit(1);
}

if (forbiddenEntries.length) {
  console.error(`Archive contains forbidden build or secret entries: ${forbiddenEntries.join(", ")}`);
  process.exit(1);
}

console.log("Source archive verified.");
