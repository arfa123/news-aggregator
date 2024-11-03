import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.DOCKERIZE ? "standalone" : undefined,
  experimental: {
    ppr: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
