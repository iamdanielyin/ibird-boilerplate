#!/bin/bash
# 新增特性分支
# Author:   Daniel
# Date:     2017/12/12
# Version:  1.0

git checkout master
read -p "请输入新的分支名称：" name
if [ "_" = "_$name" ]; then
    echo "Error：分支名不能为空"
    exit 1
fi
git checkout -b $name