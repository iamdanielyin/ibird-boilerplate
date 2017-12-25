#!/bin/bash
# 应用部署脚本
# Author:   Daniel
# Date:     2017/12/11
# Version:  1.0

name="ibird-boilerplate"

_clear(){
    none_image=`docker images -f 'dangling=true' -q`
    if [ "_$none_image" != "_" ]; then
        docker rmi -f $none_image
        echo "删除none的镜像 --> ok!"
    fi

    docker system prune -a -f
    echo "删除未使用的数据 --> ok!"

    unused_volume=`docker volume ls -qf dangling=true`
    if [ "_$unused_volume" != "_" ]; then
        docker volume rm $unused_volume
    fi
    echo "删除未使用的挂载卷 --> ok!"
}

_patch(){
    docker rm -f $name
    docker rmi -f $name

    docker build -t $name ./dist
    docker run --restart=always -d \
        -e "IBIRD_ENV=$IBIRD_ENV" \
        --name $name \
        --expose 3000 \
        $name
}

_patch
_clear