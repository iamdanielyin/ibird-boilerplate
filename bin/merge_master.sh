#!/bin/bash
# 合并到master
# 分支合并规定为单向，顺序为：feature-xxx -> develop -> master -> test -> prod
# Author:   Daniel
# Date:     2017/12/11
# Version:  1.0

git checkout develop && git pull
git checkout master && git pull
git merge develop --no-ff -m "合并develop到master：$(date '+%Y-%m-%d %T')"
git push origin

# 自动打上tag
git tag -a "`date '+release-v%y%m%d%H%M%S'`" -m "`date '+version %Y-%m-%d %T'`"
git push origin --tags

git checkout develop