import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingRoot: projectDirectory,
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
