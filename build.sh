#!/bin/sh
echo "Stopping Running Container"
docker stop ebayapic
echo "Remove Container and Image"
docker rm ebayapic
docker rmi ebayapi:latest
echo "Building Image"
docker build -t ebayapi Ebay/
docker run -itd --name=ebayapic -p 3010:3010 ebayapi
