#!/bin/bash
function cleanup {
  docker-compose down
  docker volume prune -f
}

docker-compose up -d
sleep 2
nodemon $1
trap cleanup exit
