import type { NextConfig } from "next";

const basePath = "/tools/qrgen";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: `${basePath}/`,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
