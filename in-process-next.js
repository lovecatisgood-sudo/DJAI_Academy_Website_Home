const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");

function createInProcessNext(name, directory) {
  const standaloneDir = path.join(directory, ".next", "standalone");
  const serverPath = path.join(standaloneDir, "server.js");
  const requiredFilesPath = path.join(standaloneDir, ".next", "required-server-files.json");
  if (!fs.existsSync(serverPath) || !fs.existsSync(requiredFilesPath)) {
    throw new Error(`${name} standalone runtime is incomplete: ${standaloneDir}`);
  }

  const requireFromStandalone = createRequire(serverPath);
  const next = requireFromStandalone("next");
  const requiredFiles = JSON.parse(fs.readFileSync(requiredFilesPath, "utf8"));
  const config = {
    ...requiredFiles.config,
    distDir: ".next",
    outputFileTracingRoot: standaloneDir,
  };
  const app = next({ dev: false, dir: standaloneDir, conf: config });
  const handler = app.getRequestHandler();
  let ready = false;

  return {
    async prepare() {
      await app.prepare();
      ready = true;
    },
    handle(request, response) {
      return handler(request, response);
    },
    isReady: () => ready,
    snapshot: () => ({ ready, mode: "in-process" }),
    async stop() {
      ready = false;
      if (typeof app.close === "function") await app.close();
    },
  };
}

module.exports = { createInProcessNext };
