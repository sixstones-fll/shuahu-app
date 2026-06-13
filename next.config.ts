import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API routes require server target, not static export
  // Using default server mode for API Routes support
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
