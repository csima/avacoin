#!/bin/sh
browserify js/main.js -o js/bundle.js
docker build -t avacoin .
docker tag avacoin csima/avacoin:latest
docker push csima/avacoin
