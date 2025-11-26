/** @type {import('next').NextConfig} */
const nextConfig = {
  // THIS LINE KILLS TURBOPACK DEAD — Vercel will use the stable Webpack
  // (Turbopack is still broken for 90 % of Supabase projects in 2025)
  experimental: {
    turbopack: false,
  },
};

module.exports = nextConfig;

cd ~/rusticana-website
eof
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // THIS LINE KILLS TURBOPACK DEAD — Vercel will use the stable Webpack
  // (Turbopack is still broken for 90 % of Supabase projects in 2025)
  experimental: {
    turbopack: false,
  },
};

module.exports = nextConfig;
