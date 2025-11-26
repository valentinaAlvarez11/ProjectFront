// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
<<<<<<< HEAD
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
=======
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
>>>>>>> 061eeea335d7e121eab784ed3091f8f38c10cb0a
      },
    ],
  },
};

export default nextConfig;
