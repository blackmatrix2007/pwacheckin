declare module 'next-pwa' {
  import { NextConfig } from 'next';
  
  interface PWAOptions {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    runtimeCaching?: any[];
    buildExcludes?: Array<string | RegExp>;
    scope?: string;
    sw?: string;
  }
  
  function withPWA(options?: PWAOptions): (nextConfig: NextConfig) => NextConfig;
  
  export default withPWA;
}
