import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const basePath = "/course";
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingRoot: projectDirectory,
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
