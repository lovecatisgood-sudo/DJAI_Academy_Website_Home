const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const zlib = require("node:zlib");
const { spawn } = require("node:child_process");

const rootDir = __dirname;
const homepageDir = path.join(rootDir, "djai-academy-homepage");
const voicePromoDir = path.join(rootDir, "djai-web-promo-voice");
const packageMetadata = require(path.join(rootDir, "package.json"));

const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOST || "0.0.0.0";
// Hosting providers do not always set NODE_ENV. Default to the production
// server and opt into development mode only when it is requested explicitly.
const homepagePort = Number(process.env.DJAI_HOMEPAGE_PORT || port + 1);
const voicePromoPort = Number(process.env.DJAI_VOICE_PROMO_PORT || port + 2);

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
  ".wasm": "application/wasm",
  ".gz": "application/gzip"
};

const staticMounts = [
  {
    prefix: "/_next/static",
    dir: path.join(homepageDir, ".next", "static")
  },
  {
    prefix: "/web_promo/_next/static",
    dir: path.join(voicePromoDir, ".next", "static")
  },
  {
    prefix: "/web_promo",
    dir: path.join(voicePromoDir, "public")
  },
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
    prefix: "/tools/media",
    dir: path.join(rootDir, "djai-media-tools", "public")
  },
  {
    prefix: "/tools/video-to-text/static",
    dir: path.join(rootDir, "temp", "siamese-cat-transcriber", "app", "static")
  },
  {
    prefix: "/tools/video-to-text",
    dir: path.join(rootDir, "temp", "siamese-cat-transcriber", "browser")
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
    dir: path.join(rootDir, "Siamese-Cat-Dev-Bio-Site", "dist"),
    excludePrefixes: ["/siamese_cat/dev/blog"]
  },
  {
    prefix: "/",
    dir: path.join(homepageDir, "public")
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
  if (prefix === "/") return true;
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function rewriteRequestPath(req, sourcePrefix, destinationPrefix) {
  const parsedUrl = new URL(req.url || "/", "http://localhost");
  const suffix = parsedUrl.pathname.slice(sourcePrefix.length);
  parsedUrl.pathname = `${destinationPrefix}${suffix}` || "/";
  req.url = `${parsedUrl.pathname}${parsedUrl.search}`;
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
  const stats = fs.statSync(filePath);
  const isHtml = extension === ".html";
  const isVersionedAsset = filePath.includes(`${path.sep}_next${path.sep}static${path.sep}`)
    || /[.-][a-f0-9_-]{8,}\./i.test(path.basename(filePath));
  const compressibleExtensions = new Set([".html", ".css", ".js", ".mjs", ".json", ".svg", ".txt"]);
  const acceptsGzip = /(?:^|,)\s*gzip\s*(?:,|$)/i.test(req.headers["accept-encoding"] || "");
  const acceptsBrotli = /(?:^|,)\s*br\s*(?:,|$)/i.test(req.headers["accept-encoding"] || "");
  const useCompression = req.method !== "HEAD"
    && compressibleExtensions.has(extension)
    && stats.size >= 1024;
  const etag = `W/"${stats.size.toString(16)}-${Math.floor(stats.mtimeMs).toString(16)}"`;

  if (req.headers["if-none-match"] === etag) {
    res.writeHead(304, { ETag: etag, "Cache-Control": isHtml ? "no-cache" : isVersionedAsset ? "public, max-age=31536000, immutable" : "public, max-age=86400, must-revalidate, stale-while-revalidate=604800" });
    res.end();
    return;
  }

  const headers = {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": isHtml
      ? "no-cache"
      : isVersionedAsset
        ? "public, max-age=31536000, immutable"
        : "public, max-age=86400, must-revalidate, stale-while-revalidate=604800",
    ETag: etag,
    "Last-Modified": stats.mtime.toUTCString(),
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Frame-Options": "SAMEORIGIN",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Vary": "Accept-Encoding"
  };
  if (useCompression && acceptsBrotli) headers["Content-Encoding"] = "br";
  else if (useCompression && acceptsGzip) headers["Content-Encoding"] = "gzip";
  res.writeHead(200, headers);

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  const source = fs.createReadStream(filePath);
  if (useCompression && acceptsBrotli) source.pipe(zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })).pipe(res);
  else if (useCompression && acceptsGzip) source.pipe(zlib.createGzip({ level: 6 })).pipe(res);
  else source.pipe(res);
}

function serveHealth(req, res) {
  const requiredOutputs = [
    path.join(homepageDir, ".next", "BUILD_ID"),
    path.join(homepageDir, ".next", "standalone", "server.js"),
    path.join(voicePromoDir, ".next", "BUILD_ID"),
    path.join(voicePromoDir, ".next", "standalone", "server.js"),
    path.join(rootDir, "djai-academy-course", "out", "index.html"),
    path.join(rootDir, "DJayTools-Free-QR-Generator-Source", "out", "index.html"),
    path.join(rootDir, "djai-image-resizer", "public", "index.html"),
    path.join(rootDir, "djai-pdf-tools", "out", "index.html"),
    path.join(rootDir, "djai-pdf-tools", "out", "pdf.worker.min.mjs"),
    path.join(rootDir, "djai-document-tools", "out", "document", "index.html"),
    path.join(rootDir, "djai-document-tools", "out", "document", "pdf.worker.min.mjs"),
    path.join(rootDir, "Siamese-Cat-Dev-Bio-Site", "dist", "index.html"),
    path.join(rootDir, "Siamese-Cat-Dev-Bio-Site", "dist", "course", "index.html"),
    path.join(rootDir, "Siamese-Cat-Dev-Bio-Site", "dist", "course", "th", "index.html")
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
    if ((mount.excludePrefixes || []).some((prefix) => matchesMount(pathname, prefix))) continue;

    const filePath = resolveStaticFile(mount, pathname);
    if (filePath) {
      serveStaticFile(req, res, filePath);
      return true;
    }
  }

  return false;
}

function proxyRequest(req, res, targetPort) {
  const upstream = http.request({
    hostname: "127.0.0.1",
    port: targetPort,
    method: req.method,
    path: req.url,
    headers: { ...req.headers, host: `127.0.0.1:${targetPort}` }
  }, (upstreamResponse) => {
    res.writeHead(upstreamResponse.statusCode || 502, upstreamResponse.headers);
    upstreamResponse.pipe(res);
  });

  upstream.on("error", (error) => {
    console.error(`Unable to proxy ${req.url} to port ${targetPort}.`, error);
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    }
    res.end("Application service unavailable");
  });
  req.pipe(upstream);
}

function startStandalone(name, directory, internalPort) {
  const serverPath = path.join(directory, ".next", "standalone", "server.js");
  if (!fs.existsSync(serverPath)) {
    throw new Error(`${name} standalone server is missing: ${serverPath}`);
  }

  const child = spawn(process.execPath, [serverPath], {
    cwd: path.dirname(serverPath),
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(internalPort),
      HOSTNAME: "127.0.0.1"
    },
    stdio: "inherit"
  });
  child.on("exit", (code, signal) => {
    if (code !== 0 && signal !== "SIGTERM") {
      console.error(`${name} exited unexpectedly (code ${code}, signal ${signal || "none"}).`);
    }
  });
  return child;
}

function waitForServer(internalPort, attempts = 100) {
  return new Promise((resolve, reject) => {
    const check = (remaining) => {
      const request = http.get({ hostname: "127.0.0.1", port: internalPort, path: "/" }, (response) => {
        response.resume();
        resolve();
      });
      request.on("error", () => {
        if (remaining <= 1) {
          reject(new Error(`Timed out waiting for internal service on port ${internalPort}`));
          return;
        }
        setTimeout(() => check(remaining - 1), 100);
      });
      request.setTimeout(1000, () => request.destroy());
    };
    check(attempts);
  });
}

const children = [];
let rootServer;

async function start() {
  children.push(startStandalone("DJAI homepage", homepageDir, homepagePort));
  children.push(startStandalone("DJAI voice promo", voicePromoDir, voicePromoPort));
  await Promise.all([waitForServer(homepagePort), waitForServer(voicePromoPort)]);

  return http
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

      if (pathname === "/favicon.ico") {
        redirect(res, "/favicon.svg");
        return;
      }

      if (pathname === "/web_promo") {
        redirect(res, "/web_promo/");
        return;
      }

      if (matchesMount(pathname, "/web_promo")) {
        if (tryServeMountedStatic(req, res, pathname)) {
          return;
        }
        rewriteRequestPath(req, "/web_promo", "");
        proxyRequest(req, res, voicePromoPort);
        return;
      }

      if (pathname === "/voice_admin/") {
        redirect(res, "/voice_admin");
        return;
      }

      if (matchesMount(pathname, "/voice_admin")) {
        res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
        const destinationPrefix = pathname.startsWith("/voice_admin/api/") ? "" : "/admin";
        rewriteRequestPath(req, "/voice_admin", destinationPrefix);
        proxyRequest(req, res, voicePromoPort);
        return;
      }

      if (pathname === "/tools/video-to-text") {
        redirect(res, "/tools/video-to-text/");
        return;
      }

      if (matchesMount(pathname, "/tools/video-to-text")) {
        if (tryServeMountedStatic(req, res, pathname)) {
          return;
        }
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
        res.end("Video to Text page not found");
        return;
      }

      if (tryServeMountedStatic(req, res, pathname)) {
        return;
      }

      proxyRequest(req, res, homepagePort);
    })
    .listen(port, hostname, () => {
      console.log(`DJAI Academy website and voice promo running at http://${hostname}:${port}`);
    });
}

function stopChildren() {
  for (const child of children) {
    if (!child.killed) child.kill("SIGTERM");
  }
}

function shutdown() {
  stopChildren();
  if (rootServer) {
    rootServer.close(() => process.exit(0));
    return;
  }
  process.exit(0);
}

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);

start().then((server) => {
  rootServer = server;
}).catch((error) => {
  console.error("Unable to start DJAI Academy website.", error);
  stopChildren();
  process.exit(1);
});
