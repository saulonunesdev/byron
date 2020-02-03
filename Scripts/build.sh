#!/bin/sh
Scripts/stop.sh
Scripts/remove.sh
echo "Bundling"
npm run bundle --prefix App/
echo "Building Images"
docker build -t ebayapi Ebay/
docker build -t emailapi Email/
docker build -t byronapp App/
echo "Starting Containers"
docker-compose up -d
