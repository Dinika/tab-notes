#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

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