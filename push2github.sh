#!/usr/bin/bash
set -x;
time (git add --verbose --all; git commit --allow-empty-message --message=$(date "+%F-%H-%M") --verbose; git push --force --verbose;)
