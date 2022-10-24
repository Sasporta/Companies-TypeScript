#!/bin/bash
function cleanup {
  docker-compose --profile metadata down
  docker volume prune -f
  docker image prune -f
}

docker-compose --profile metadata up -d
sleep 5
nodemon src/apps/metadata/server.ts
trap cleanup exit
