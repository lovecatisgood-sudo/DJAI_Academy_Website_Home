import { spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const archive = "djai-voice-agent-v1-source.zip";
const paths = [
  "README.md",
  "package.json",
  "pnpm-workspace.yaml",
  "pnpm-lock.yaml",
  ".nvmrc",
  ".node-version",
  "next.config.ts",
  "tsconfig.json",
  "next-env.d.ts",
  "postcss.config.mjs",
  ".env.example",
  "DEPLOYMENT.md",
  "ACCEPTANCE.md",
  "PROJECT_STATE.md",
  "DJAI_Voice_Agent_V1_Build_Spec.md",
  "DJAI_Voice_Admin_V1_5_PRD.md",
  "DJAI_Voice_Admin_V1_5_Architecture.md",
  "DJAI_Voice_Admin_V1_5_UIUX_Design.md",
  "DJAI_Voice_Admin_V1_5_Implementation_Plan.md",
  "scripts",
  "src",
  "public",
];

if (existsSync(archive)) {
  rmSync(archive);
}

const result = spawnSync("zip", ["-r", archive, ...paths], {
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log(`Created ${archive}`);
