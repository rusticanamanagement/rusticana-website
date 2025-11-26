/** @type {import('next').NextConfig} */
const nextConfig = {
  // THIS LINE IS THE NUCLEAR FIX — disables Turbopack completely
  // Vercel will now use the stable Webpack bundler that works with Supabase
  experimental: {
    turbopack: false,
  },
};

module.exports = nextConfig;