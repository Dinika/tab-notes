#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

# Try to load .env if API key is not already set
if [[ -z "${VITE_WORDNIK_API_KEY:-}" ]]; then
  if [[ -f ".env" ]]; then
    echo "Loading API key from .env file..."
    set -o allexport
    source .env
    set +o allexport
  fi
fi

if [[ -z "${VITE_WORDNIK_API_KEY:-}" ]]; then
  echo "❌ VITE_WORDNIK_API_KEY is not set and no valid .env file was found."
  exit 1
fi

rm -rf firefox-extension
rm -rf dist
npm run build

mkdir -p firefox-extensions
cp -a manifest.json icon.png dist/assets dist/index.html firefox-extensions/

sed -i 's|"/|"./|g' firefox-extensions/index.html

cd firefox-extensions
zip -r firefox-extension.zip ./manifest.json assets/ index.html  icon.png
cd ..

echo "Done!"