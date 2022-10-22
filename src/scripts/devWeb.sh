#!/bin/bash
function cleanup {
  docker-compose down
  docker volume prune -f
  docker image prune -f
}

docker-compose up -d
sleep 5
nodemon src/apps/web/server.ts
trap cleanup exit
