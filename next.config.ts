import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "logodownload.org",
      },
      {
        protocol: "https",
        hostname: "www.cataloniahotels.com",
      },
    ],
  },
};

export default nextConfig;
