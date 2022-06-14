#!/bin/zsh
export MOCK=true
jest --maxWorkers=50% -- $1