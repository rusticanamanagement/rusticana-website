import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This single line is the only thing that reliably kills Turbopack in 2025
  // Vercel ignores everything else when this flag exists
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  experimental: {
    turbopack: false,
  },
};

export default nextConfig;
