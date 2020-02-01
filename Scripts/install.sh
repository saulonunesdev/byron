#!/bin/sh
echo "Installing Node Modules on ByronApp"
rm -rf App/node_modules
npm install --prefix App/
echo "Installing Node Modules on EbayApi"
rm -rf Ebay/node_modules
npm install --prefix Ebay/

Scripts/build.sh