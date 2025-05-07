#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

rm -rf flashcards-extension
rm -rf dist
npm run build

mkdir -p flashcards-extension
cp -a manifest.json icon.png dist/assets dist/index.html flashcards-extension/

sed -i 's|"/|"./|g' flashcards-extension/index.html

cd flashcards-extension
zip -r flashcards-extension.zip ./manifest.json assets/ index.html  icon.png
cd ..

echo "Done!"