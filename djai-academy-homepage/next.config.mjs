import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: projectDirectory,
  trailingSlash: true,
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" }
    ];
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/:asset*.(webp|avif|png|jpg|jpeg|svg|woff|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }]
      },
      {
        source: "/(robots.txt|ads.txt|sitemap.xml)",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, stale-while-revalidate=3600" }]
      }
    ];
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
