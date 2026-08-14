import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = new URL("../out", import.meta.url).pathname;

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) {
      visit(path);
      continue;
    }
    if (entry !== "index.html") continue;
    const locale = path.includes("/vi/") ? "vi" : path.includes("/en/") ? "en" : null;
    if (!locale) continue;
    const html = readFileSync(path, "utf8");
    writeFileSync(path, html.replace('<html lang="th">', `<html lang="${locale}">`));
  }
}

visit(outDir);
