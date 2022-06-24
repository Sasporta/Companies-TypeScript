#!/bin/bash
source LOAD_TEST=true
npx typeorm-ts-node-commonjs schema:sync -d src/config/typeorm
npx typeorm-extension seed -f dist/config/typeorm.js
