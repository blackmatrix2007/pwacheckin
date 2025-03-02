declare module 'next-pwa' {
  import { NextConfig } from 'next';
  
  interface PWAOptions {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    runtimeCaching?: Array<{
      urlPattern: RegExp | string;
      handler: string;
      options?: {
        cacheName?: string;
        expiration?: {
          maxEntries?: number;
          maxAgeSeconds?: number;
        };
        cacheableResponse?: {
          statuses?: number[];
          headers?: Record<string, string>;
        };
      };
    }>;
    buildExcludes?: Array<string | RegExp>;
    scope?: string;
    sw?: string;
  }
  
  function withPWA(options?: PWAOptions): (nextConfig: NextConfig) => NextConfig;
  
  export default withPWA;
}
