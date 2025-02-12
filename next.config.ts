import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vdnmyksmsffeibfnvail.supabase.co',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/user',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
