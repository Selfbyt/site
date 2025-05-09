#!/bin/bash

# Custom build script for Cloudflare Pages to optimize bundle size

# Use production settings
export NODE_ENV=production

# Ensure correct node version and memory allocation
export NODE_OPTIONS="--max_old_space_size=4096"

# Show current directory and list files
echo "Current directory: $(pwd)"
ls -la

# Install dependencies (don't omit dev dependencies)
echo "Installing dependencies..."
npm ci --production=false

# Direct installation of tailwindcss that worked locally
echo "Installing tailwindcss and related packages..."
npm install --save-dev tailwindcss postcss autoprefixer

# Verify tailwindcss installation
echo "Verifying tailwindcss installation..."
if [ -d "./node_modules/tailwindcss" ]; then
  echo "✅ Tailwindcss is installed correctly."
else
  echo "⚠️ Tailwindcss directory not found. Installing again..."
  npm install --no-save tailwindcss
fi

# Log the tailwind config being used
echo "Using tailwind configuration file: $(ls *tailwind*config*)"


# Make sure tailwindcss is installed in the system path
echo "Installing tailwindcss globally for system access..."
npm install -g tailwindcss

# Create a separate installation of tailwindcss in a known location with clear output
echo "Creating dedicated tailwindcss installation..."
mkdir -p ./tailwind-temp
cd ./tailwind-temp
echo "Initializing package.json in tailwind-temp directory"
npm init -y
echo "Installing tailwindcss in tailwind-temp directory"
npm install tailwindcss postcss autoprefixer --no-save
cd ..

# Add multiple paths to ensure binaries are found
export PATH="$PATH:$(pwd)/tailwind-temp/node_modules/.bin:$(pwd)/node_modules/.bin:/opt/buildhome/.npm-global/bin"
echo "Updated PATH: $PATH"

# Verify tailwindcss is accessible now
echo "Verifying tailwindcss is on PATH:"
which tailwindcss || echo "tailwindcss not found in PATH"

# Instead of using npm run build:cloudflare, we'll execute the commands directly
echo "Starting direct Cloudflare build..."

# Process Tailwind CSS directly
echo "Processing Tailwind CSS..."

# Find the tailwindcss binary and use it directly
TAILWIND_BIN="$(find . -name tailwindcss -type f -executable | head -n 1)"
if [ -z "$TAILWIND_BIN" ]; then
  # If executable not found, look for the node module
  TAILWIND_BIN="$(find ./node_modules -path */tailwindcss/lib/cli.js | head -n 1)"
  if [ -z "$TAILWIND_BIN" ]; then
    echo "❌ Could not find tailwindcss - trying global install"
    npm install -g tailwindcss
    TAILWIND_BIN="tailwindcss"
  else
    echo "✅ Found Tailwind at $TAILWIND_BIN"
    # This is a node script, not a binary
    TAILWIND_BIN="node $TAILWIND_BIN"
  fi
else
  echo "✅ Found Tailwind binary at $TAILWIND_BIN"
fi

# Process the CSS files
eval "$TAILWIND_BIN -i ./styles/globals.css -o ./styles/output.css"

# Then build Next.js
echo "Building Next.js..."
NODE_ENV=production next build

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
  # Show the contents of node_modules to debug
  echo "Contents of node_modules directory:"
  ls -la node_modules | grep tailwind
  exit 1
fi
