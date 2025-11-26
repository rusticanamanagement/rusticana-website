/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the nuclear option — Vercel WILL use Webpack
  webpack: (config) => config,
  experimental: {
    turbopack: false,
  },
};

export default nextConfig;
