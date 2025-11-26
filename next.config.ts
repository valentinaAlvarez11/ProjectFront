// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.realhotelsandresorts.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logodownload.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'r.profitroom.pl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'boraboracartagena.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ejemplo.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
