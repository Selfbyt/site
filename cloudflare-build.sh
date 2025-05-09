#!/bin/bash

# Custom build script for Cloudflare Pages to optimize bundle size

# Use production settings
export NODE_ENV=production

# Ensure correct node version
export NODE_OPTIONS="--max_old_space_size=4096"

# Install all dependencies explicitly and force installation of tailwindcss
npm ci
npm install --save-dev tailwindcss postcss autoprefixer

# Verify tailwindcss is installed
echo "Verifying tailwindcss installation..."
if [ -d "./node_modules/tailwindcss" ]; then
  echo "Tailwindcss is installed correctly."
else
  echo "Failed to install tailwindcss, trying again..."
  npm install --no-save tailwindcss@3.4.17 postcss autoprefixer
fi

# Build the app
echo "Starting Next.js build..."
npm run build

# Only clean up if build was successful
if [ $? -eq 0 ]; then
  echo "Build successful, optimizing for Cloudflare..."
  # Clean unnecessary cache files that are too large for Cloudflare
  find .next/cache -type f -size +20M -delete 2>/dev/null || true

  # Remove webpack cache files
  rm -rf .next/cache/webpack/client-production/*.pack 2>/dev/null || true

  echo "Build completed and optimized for Cloudflare Pages"
else
  echo "Build failed!"
  exit 1
fi
