#!/usr/bin/bash
set -x;
time (git add --verbose --all; git commit --allow-empty-message --message=$(date "+%F_%H-%M-%S") --verbose; git push --force --verbose;)
