#!/usr/bin/bash
set -x;
time (git add --verbose --all; git commit --allow-empty-message --verbose; git push --verbose;)
