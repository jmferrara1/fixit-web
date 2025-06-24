#!/usr/bin/env bash
set -e

# Remove any old bits
rm -rf node_modules/next node_modules/vitest node_modules/.bin/next node_modules/.bin/vitest

# Copy in the vendored packages
cp -R vendor/next node_modules/next
cp -R vendor/vitest node_modules/vitest

# Ensure the bin folder exists
mkdir -p node_modules/.bin

# Copy in the executables
cp vendor/.bin/next node_modules/.bin/next
cp vendor/.bin/vitest node_modules/.bin/vitest

# Make sure they’re executable
chmod +x node_modules/.bin/next
chmod +x node_modules/.bin/vitest
