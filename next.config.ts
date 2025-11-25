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
      {
        protocol: 'https',
        hostname: 'logodownload.org',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'r.profitroom.pl',
      },
      {
        protocol: 'https',
        hostname: 'boraboracartagena.com',
      },
    ],
    domains: ["logodownload.org", "static.wixstatic.com", "ejemplo.com", "via.placeholder.com", "r.profitroom.pl", "boraboracartagena.com"],
  },
};

export default nextConfig;
