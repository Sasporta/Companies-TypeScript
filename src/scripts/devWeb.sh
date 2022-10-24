#!/bin/bash
function cleanup {
  docker-compose --profile web down
  docker volume prune -f
  docker image prune -f
}

docker-compose --profile web up -d
nodemon src/apps/web/server.ts
trap cleanup exit
