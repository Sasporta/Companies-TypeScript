#!/bin/zsh
docker-compose up -d
npx jest --maxWorkers=50% $1
docker-compose down