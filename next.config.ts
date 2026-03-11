import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.acnnewswire.com',
        port: '',
        pathname: '/images/company/**', // This matches your image path!
        search: '',
      },
      // Add other domains you might need
      {
        protocol: 'https',
        hostname: 'photos.acnnewswire.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
