#!/bin/bash
export MOCK=true
jest --maxWorkers=50% -- $1