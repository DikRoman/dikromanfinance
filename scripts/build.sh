#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

rm -rf dist
mkdir -p dist/assets/fonts/montserrat

cp -r src/html/* dist/
cp -r src/assets dist/
cp -r src/css dist/
cp -r src/js dist/
cp node_modules/aos/dist/aos.css dist/css/aos.css
cp node_modules/aos/dist/aos.js dist/js/aos.js

for subset in cyrillic cyrillic-ext latin latin-ext; do
  for weight in 400 500 600 700 800; do
    cp "node_modules/@fontsource/montserrat/files/montserrat-${subset}-${weight}-normal.woff2" \
      "dist/assets/fonts/montserrat/"
  done
done

echo "Build complete: dist/"
