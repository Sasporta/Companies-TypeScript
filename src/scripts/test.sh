#!/bin/bash
npx tsc
eslint ./
docker-compose up -d
jest --maxWorkers=50% $1
docker-compose down
docker volume prune -f
