import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors in production builds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "qualified-flamingo-492.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3210",
      },
    ],
  },
};

export default nextConfig;
