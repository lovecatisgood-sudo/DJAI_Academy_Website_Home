import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = new URL("../out/", import.meta.url).pathname;
function walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name === "index.html" && (path.includes("/en/") || path.includes("/vi/"))) {
      const html = readFileSync(path, "utf8");
      const language = path.includes("/vi/") ? "vi" : "en";
      writeFileSync(path, html.replace('<html lang="th">', `<html lang="${language}">`));
    }
  }
}
walk(out);
