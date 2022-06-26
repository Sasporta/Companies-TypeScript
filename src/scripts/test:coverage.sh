#!/bin/bash
docker-compose up -d
jest --maxWorkers=50% --coverage-reporters=html
docker-compose down
docker volume prune -f
