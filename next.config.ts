import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/:path",
      headers: [{
        key: "X-Frame-Options",
        value: "SAMEORIGIN"
      }]
    }]
  },
  output: "standalone",
};

export default nextConfig;
