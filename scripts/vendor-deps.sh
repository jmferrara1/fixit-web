#!/usr/bin/env bash
set -e
# Remove old modules
rm -rf node_modules/next node_modules/vitest node_modules/.bin/next node_modules/.bin/vitest
# Copy vendor files into place
cp -R vendor/next node_modules/next
cp -R vendor/vitest node_modules/vitest
mkdir -p node_modules/.bin
cp vendor/.bin/next node_modules/.bin/next
cp vendor/.bin/vitest node_modules/.bin/vitest

