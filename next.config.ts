import withPWA from 'next-pwa';
import { NextConfig } from 'next';

// Get the repository name from package.json or environment variable
const REPO_NAME = 'pwacheckin';
const isProd = process.env.NODE_ENV === 'production';

const config: NextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static exports
  distDir: 'out',
  // Configure basePath and assetPrefix for GitHub Pages
  basePath: isProd ? `/${REPO_NAME}` : '',
  assetPrefix: isProd ? `/${REPO_NAME}/` : '',
  images: {
    unoptimized: true, // Required for static export
  },
};

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: '/sw.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.example\.com\/.*$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24, // 1 day
        },
      },
    },
    {
      urlPattern: /\.(js|css|png|jpg|jpeg|svg|gif|ico|webp)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-assets',
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
  ],
})(config);

export default nextConfig;
