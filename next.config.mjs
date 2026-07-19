/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      {
        protocol: 'https',
        hostname: 'admin-cms.zunkireelabs.com',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: 'cmstc.com',
      },
      {
        protocol: 'https',
        hostname: 'www.iko.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hunterdouglasgroup.com',
      },
      {
        protocol: 'https',
        hostname: 'ap.hunterdouglas.asia',
      },
      {
        protocol: 'https',
        hostname: 'image-apac.archify.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'dormakaba-res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'betterhomeapp.com',
      },
      {
        protocol: 'https',
        hostname: 'danubetoilet.com',
      },
      {
        protocol: 'https',
        hostname: 'images.jdmagicbox.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  async redirects() {
    return [
      {
        source: '/products-services',
        destination: '/trading',
        permanent: true,
      },
      {
        source: '/products-services/trading',
        destination: '/trading',
        permanent: true,
      },
      {
        source: '/products-services/contracting',
        destination: '/contracting',
        permanent: true,
      },
      {
        source: '/products-services/:slug',
        destination: '/trading/:slug',
        permanent: true,
      },
      { source: '/trading/roofing-systems', destination: '/trading/roofing', permanent: true },
      { source: '/trading/waterproofing-systems', destination: '/trading/waterproofing', permanent: true },
      { source: '/trading/ceiling', destination: '/trading/ceiling-systems', permanent: true },
      { source: '/trading/facade', destination: '/trading/facade-solutions', permanent: true },
      { source: '/trading/wastewater', destination: '/trading/water-and-wastewater-solutions', permanent: true },
      { source: '/trading/water-wastewater-solutions', destination: '/trading/water-and-wastewater-solutions', permanent: true },
      { source: '/trading/aluminum', destination: '/trading/aluminum-doors-windows', permanent: true },
      { source: '/trading/aluminium', destination: '/trading/aluminum-doors-windows', permanent: true },
      { source: '/trading/railings', destination: '/trading/architectural-glass-railing-systems', permanent: true },
      { source: '/trading/hardware', destination: '/trading/door-hardware', permanent: true },
      { source: '/trading/office-furniture', destination: '/trading/office-furnitures', permanent: true },
      { source: '/trading/fire-doors', destination: '/trading/fire-rated-doors', permanent: true },
      { source: '/trading/coating', destination: '/trading/premium-wood-glass-metal-coating', permanent: true },
    ];
  },
};

export default nextConfig;
