#!/bin/bash
docker-compose up -d
jest --maxWorkers=50% $1
docker-compose down