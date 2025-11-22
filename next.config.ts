// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",   // acepta cualquier host (wildcard)
        port: "",
        pathname: "/**",  // acepta cualquier path
      },
    ],
  },
};

export default nextConfig;
