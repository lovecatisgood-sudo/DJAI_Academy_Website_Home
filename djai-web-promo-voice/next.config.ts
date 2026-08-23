import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  assetPrefix: "/web_promo",
  output: "standalone",
  outputFileTracingRoot: projectRoot,
  // Deno Deploy executes build tooling through its Node compatibility layer.
  // Disabling server minification there avoids missing numeric server chunks
  // during Next.js page-data collection while preserving Hostinger's output.
  experimental: {
    serverMinification: process.env.DENO_DEPLOY !== "true",
  },
};

export default nextConfig;
