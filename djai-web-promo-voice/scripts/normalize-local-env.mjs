import { readFileSync, writeFileSync } from "node:fs";

const path = ".env.local";
const keys = [
  "DATABASE_URL",
  "OPENAI_API_KEY",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "SESSION_PASSWORD",
  "SESSION_SIGNING_SECRET",
  "WIDGET_ALLOWED_ORIGINS",
];
const text = readFileSync(path, "utf8");
const found = {};

for (const line of text.split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);

  if (!match) {
    continue;
  }

  const key = match[1];

  if (!keys.includes(key) || found[key] !== undefined) {
    continue;
  }

  let value = match[2].trim();

  if (value.startsWith('"') || value.startsWith("'")) {
    value = value.slice(1);
  }

  if (value.endsWith('"') || value.endsWith("'")) {
    value = value.slice(0, -1);
  }

  found[key] = value;
}

const missing = keys.filter((key) => !found[key]);

if (missing.length) {
  console.error(`Missing keys in ${path}: ${missing.join(", ")}`);
  process.exit(1);
}

const quote = (value) =>
  `"${String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')}"`;

writeFileSync(
  path,
  ["# DJAI Voice Sales Agent local environment", ...keys.map((key) => `${key}=${quote(found[key])}`), ""].join(
    "\n",
  ),
);

console.log(`Normalized ${path} formatting.`);
