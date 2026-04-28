import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Allow external device testing
  serverExternalPackages: [],
};

// Allow custom dev origins for external device testing
(nextConfig as Record<string, any>).allowedDevOrigins = ["172.17.11.120", "localhost:3000"];

export default nextConfig;
