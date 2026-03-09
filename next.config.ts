import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ['localhost', 'example.com'], // adicione todos os domínios necessários aqui
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '3000',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'example.com',
        port: '3000',
        pathname: '/**',
        search: '',
      },
    ],
    // Em desenvolvimento, você pode desativar a otimização
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
