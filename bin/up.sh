#!/bin/bash
# 应用部署脚本
# Author:   Daniel
# Date:     2017/12/11
# Version:  1.0

name="ibird-boilerplate"

docker rm -f $name
docker rmi -f $name

docker build -t $name ./dist
docker run --restart=always -d \
	-e "CONFIG_ENV=$CONFIG_ENV" \
	--name $name \
	--expose 3000 \
	$name