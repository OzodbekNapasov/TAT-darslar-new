import type {NextConfig} from 'next';

const isOffline = process.env.OFFLINE === '1';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  output: isOffline ? 'export' : 'standalone',
  ...(isOffline ? {assetPrefix: '.', distDir: '.next-offline'} : {}),
};

export default nextConfig;
