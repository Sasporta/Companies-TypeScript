#!/bin/bash
if [ "$DEPLOY_ENV" == dev ]
then
  src/scripts/wait-for-it.sh rabbit:5672 --strict --timeout=300 -- node dist/apps/$APP
else
  node dist/apps/$APP
fi
