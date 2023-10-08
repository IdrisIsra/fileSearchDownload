/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'productgallery.snoc.com.tr',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
}

export default nextConfig
