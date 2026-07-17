/** @type {import('next').NextConfig} */
const basePath = "/course";

const nextConfig = {
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
