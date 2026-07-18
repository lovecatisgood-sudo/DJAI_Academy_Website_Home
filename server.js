const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const rootDir = __dirname;
const homepageDir = path.join(rootDir, "djai-academy-homepage");
const nextPackagePath = path.join(homepageDir, "node_modules", "next");
const next = require(nextPackagePath);
const packageMetadata = require(path.join(rootDir, "package.json"));

const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOST || "0.0.0.0";
const dev = process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "prod";

const app = next({ dev, dir: homepageDir, hostname, port });
const handle = app.getRequestHandler();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".gz": "application/gzip"
};

const staticMounts = [
  {
    prefix: "/course",
    dir: path.join(rootDir, "djai-academy-course", "out")
  },
  {
    prefix: "/tools/qrgen",
    dir: path.join(rootDir, "DJayTools-Free-QR-Generator-Source", "out")
  },
  {
    prefix: "/tools/resizeimg",
    dir: path.join(rootDir, "djai-image-resizer", "public")
  },
  {
    prefix: "/tools/PDFTools",
    dir: path.join(rootDir, "djai-pdf-tools", "out")
  },
  {
    prefix: "/tools/document",
    dir: path.join(rootDir, "djai-document-tools", "out", "document")
  },
  {
    prefix: "/tools/ai",
    dir: path.join(rootDir, "djai-document-tools", "out", "ai")
  },
  {
    prefix: "/tools/spreadsheet",
    dir: path.join(rootDir, "djai-document-tools", "out", "spreadsheet")
  },
  {
    prefix: "/tools/_next",
    dir: path.join(rootDir, "djai-document-tools", "out", "_next")
  },
  {
    prefix: "/tools/djai-assets",
    dir: path.join(rootDir, "djai-document-tools", "out", "djai-assets")
  },
  {
    prefix: "/siamese_cat/dev",
    dir: path.join(rootDir, "Siamese-Cat-Dev-Bio-Site", "dist")
  }
];

function normalizePathname(url) {
  try {
    return decodeURIComponent(new URL(url, "http://localhost").pathname);
  } catch {
    return "/";
  }
}

function redirect(res, location, statusCode = 308) {
  res.writeHead(statusCode, {
    Location: location,
    "Cache-Control": "public, max-age=31536000, immutable"
  });
  res.end();
}

function matchesMount(pathname, prefix) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function resolveStaticFile(mount, pathname) {
  let stripped = pathname.slice(mount.prefix.length) || "/";
  if (stripped.endsWith("/")) stripped += "index.html";

  const safePath = path.normalize(stripped).replace(/^(\.\.[/\\])+/, "");
  let candidate = path.resolve(mount.dir, `.${safePath.startsWith("/") ? safePath : `/${safePath}`}`);

  if (!candidate.startsWith(mount.dir)) {
    return null;
  }

  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return candidate;
  }

  if (!path.extname(candidate)) {
    candidate = path.join(candidate, "index.html");
    if (candidate.startsWith(mount.dir) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

function serveStaticFile(req, res, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const isHtml = extension === ".html";
  const isVersionedAsset = /[.-][a-f0-9]{8,}\./i.test(path.basename(filePath));

  res.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": isHtml
      ? "no-cache"
      : isVersionedAsset
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600, must-revalidate",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  fs.createReadStream(filePath).pipe(res);
}

function serveHealth(req, res) {
  const requiredOutputs = [
    path.join(homepageDir, ".next", "BUILD_ID"),
    path.join(rootDir, "djai-academy-course", "out", "index.html"),
    path.join(rootDir, "DJayTools-Free-QR-Generator-Source", "out", "index.html"),
    path.join(rootDir, "djai-image-resizer", "public", "index.html"),
    path.join(rootDir, "djai-pdf-tools", "out", "index.html"),
    path.join(rootDir, "djai-pdf-tools", "out", "pdf.worker.min.mjs"),
    path.join(rootDir, "djai-document-tools", "out", "document", "index.html"),
    path.join(rootDir, "djai-document-tools", "out", "document", "pdf.worker.min.mjs"),
    path.join(rootDir, "Siamese-Cat-Dev-Bio-Site", "dist", "index.html")
  ];
  const buildsReady = requiredOutputs.every((output) => fs.existsSync(output));
  const body = JSON.stringify({
    status: buildsReady ? "ok" : "degraded",
    app: packageMetadata.name,
    version: packageMetadata.version,
    buildsReady
  });

  res.writeHead(buildsReady ? 200 : 503, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-DJAI-Application": "academy-root"
  });
  res.end(req.method === "HEAD" ? undefined : body);
}

function tryServeMountedStatic(req, res, pathname) {
  if (matchesMount(pathname, "/tools/Resizeimg")) {
    redirect(res, pathname.replace("/tools/Resizeimg", "/tools/resizeimg"));
    return true;
  }

  if (pathname === "/tools/docx-to-pdf" || pathname === "/tools/docx-to-pdf/") {
    redirect(res, "/tools/document/docx-to-pdf/");
    return true;
  }

  if (pathname === "/tools/docx-to-pdf/en" || pathname === "/tools/docx-to-pdf/en/") {
    redirect(res, "/tools/document/docx-to-pdf/en/");
    return true;
  }

  if (pathname === "/tools/word-to-pdf" || pathname === "/tools/word-to-pdf/") {
    redirect(res, "/tools/document/docx-to-pdf/");
    return true;
  }

  if (pathname === "/tools/word-to-pdf/en" || pathname === "/tools/word-to-pdf/en/") {
    redirect(res, "/tools/document/docx-to-pdf/en/");
    return true;
  }

  if (pathname === "/tools/document/word-to-pdf" || pathname === "/tools/document/word-to-pdf/") {
    redirect(res, "/tools/document/docx-to-pdf/");
    return true;
  }

  if (pathname === "/tools/document/word-to-pdf/en" || pathname === "/tools/document/word-to-pdf/en/") {
    redirect(res, "/tools/document/docx-to-pdf/en/");
    return true;
  }

  for (const mount of staticMounts) {
    if (!matchesMount(pathname, mount.prefix)) continue;

    const filePath = resolveStaticFile(mount, pathname);
    if (filePath) {
      serveStaticFile(req, res, filePath);
      return true;
    }
  }

  return false;
}

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const pathname = normalizePathname(req.url || "/");
      const requestHost = String(req.headers.host || "").split(":")[0].toLowerCase();

      if (requestHost === "djai.academy") {
        redirect(res, `https://www.djai.academy${req.url || "/"}`);
        return;
      }

      if (pathname === "/healthz") {
        serveHealth(req, res);
        return;
      }

      if (tryServeMountedStatic(req, res, pathname)) {
        return;
      }

      handle(req, res);
    })
    .listen(port, hostname, () => {
      console.log(`DJAI Academy website running at http://${hostname}:${port}`);
    });
}).catch((error) => {
  console.error("Unable to start DJAI Academy website.", error);
  process.exit(1);
});
