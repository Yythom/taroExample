#!/bin/bash
git add .
echo "请输入提交描述文字如果没有默认: fix"
read describe
if [ ! -n "$describe" ]; then
    describe="fix"
fi
echo $describe
git commit -m $describe

echo "push上传：1    pull拉取：2"
read handle

if [ "$handle" == 1 ]; then
    echo "0 ——> master"
    echo "请直接输入分支名称"
else
    echo "0 ——> master"
    echo "请直接输入分支名称"
fi

while [ $handle == 2 ]; do
    read barch
    tempbarch=""
    if [ $barch == 0 ]; then
        tempbarch="master"
    else
        tempbarch=$barch
    fi
    echo $tempbarch
    git pull origin $tempbarch
    kill $$
done

while [ $handle == 1 ]; do
    read barcha
    pushbarch=""
    if [ $barcha == 0 ]; then
        pushbarch="master"
    else
        pushbarch=$barcha
    fi
    echo $pushbarch
    git push origin $pushbarch
    kill $$
done
