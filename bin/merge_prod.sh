#!/bin/bash
# 合并到prod
# 分支合并规定为单向，顺序为：feature-xxx -> master -> test -> uat -> prod
# Author:   Daniel
# Date:     2017/12/11
# Version:  1.0

git checkout uat && git pull
git checkout prod && git pull
git merge uat --no-ff -m "合并uat到prod：$(date '+%Y-%m-%d %T')"
git push origin

# 自动打上tag
git tag -a "`date '+release-v%y%m%d%H%M%S'`" -m "`date '+version %Y-%m-%d %T'`"
git push origin --tags
git checkout master