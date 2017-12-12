#!/bin/bash

name="ibird-boilerplate-admin"
docker rm -f $name
docker run --restart=always -d \
    --name $name \
    -v $PWD/dist:/usr/share/nginx/html \
    -p 80:80 \
    nginx:stable-alpine