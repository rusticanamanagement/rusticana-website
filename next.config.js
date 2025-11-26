/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false,
  },
  transpilePackages: ['@supabase/supabase-js'],
};

module.exports = nextConfig;
