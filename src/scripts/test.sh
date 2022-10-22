#!/bin/bash
npx tsc
eslint ./
docker-compose $1 up -d
jest --maxWorkers=50% $2$3
docker-compose $1 down
docker volume prune -f
docker image prune -f
