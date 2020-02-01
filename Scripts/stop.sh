#!/bin/sh
echo "Stopping and Removing Containers"
docker rm $(docker stop $(docker ps -a -q --filter ancestor=ebayapi --format="{{.ID}}"))
docker rm $(docker stop $(docker ps -a -q --filter ancestor=byronapp --format="{{.ID}}"))