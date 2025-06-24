#!/usr/bin/env bash
set -e
# Remove old modules
# Ensure target directories exist
mkdir -p node_modules node_modules/.bin
rm -rf node_modules/next node_modules/vitest node_modules/playwright \
       node_modules/stripe node_modules/react-three-fiber node_modules/@react-three/drei \
       node_modules/@sentry/nextjs node_modules/.bin/next node_modules/.bin/vitest node_modules/.bin/playwright \
       .playwright
# Copy vendor files into place
cp -R vendor/next node_modules/next
cp -R vendor/vitest node_modules/vitest
cp -R vendor/playwright node_modules/playwright
cp -R vendor/playwright/.playwright .playwright
cp -R vendor/stripe node_modules/stripe
cp -R vendor/react-three-fiber node_modules/react-three-fiber
mkdir -p node_modules/@react-three
cp -R vendor/@react-three/drei node_modules/@react-three/drei
mkdir -p node_modules/@sentry
cp -R vendor/@sentry/nextjs node_modules/@sentry/nextjs
cp vendor/.bin/next node_modules/.bin/next
cp vendor/.bin/vitest node_modules/.bin/vitest
cp vendor/.bin/playwright node_modules/.bin/playwright

