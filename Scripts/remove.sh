#!/bin/sh
echo "Remove Images"
docker rmi ebayapi:latest
docker rmi emailapi:latest
docker rmi byronapp:latest
docker rmi serverbyron:latest
docker rmi mongoapi:latest