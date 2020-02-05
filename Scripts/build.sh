#!/bin/sh
Scripts/stop.sh
Scripts/remove.sh
echo "Bundling"
npm run bundle --prefix App/
npm run bundle --prefix Mongo/
echo "Building Images"
docker build -t ebayapi Ebay/
docker build -t emailapi Email/
docker build -t byronapp App/
docker build -t serverbyron Server/
docker build -t mongoapi Mongo/
echo "Starting Containers"
docker-compose up -d
