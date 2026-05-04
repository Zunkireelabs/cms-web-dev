/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cmstc.com',
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
    ];
  },
};

export default nextConfig;
