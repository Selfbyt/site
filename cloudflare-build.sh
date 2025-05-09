#!/bin/bash

# Custom build script for Cloudflare Pages to optimize bundle size

# Use production settings
export NODE_ENV=production

# Install dependencies
npm ci

# Build the app
npm run build

# Clean unnecessary cache files that are too large for Cloudflare
find .next/cache -type f -size +20M -delete

# Remove webpack cache files
rm -rf .next/cache/webpack/client-production/*.pack

echo "Build completed and optimized for Cloudflare Pages"
