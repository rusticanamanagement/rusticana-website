/** @type {import('next').NextConfig} */
const nextConfig = {
  // This forces Vercel to use the stable Webpack bundler instead of Turbopack
  webpack: (config) => config,
  // Optional but helps avoid future issues
  transpilePackages: ['@supabase/supabase-js'],
};

module.exports = nextConfig;