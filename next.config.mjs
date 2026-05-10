/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  compress: true,
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  },
  experimental: {
    // Keep prefetched/visited route segments in the client cache longer
    // so back/forward and hover-then-click navigation feels instant.
    staleTimes: {
      dynamic: 60,
      static: 300,
    },
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
