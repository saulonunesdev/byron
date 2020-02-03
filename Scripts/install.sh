#!/bin/sh
echo "Installing Node Modules on ByronApp"
rm -rf App/node_modules
npm install --prefix App/
echo "Installing Node Modules on EbayApi"
rm -rf Ebay/node_modules
npm install --prefix Ebay/
echo "Installing Node Modules on EmailApi"
rm -rf Email/node_modules
npm install --prefix Email/

Scripts/build.sh