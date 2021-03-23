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

if [$handle==1]; then
    echo "请输入要拉取的分支名称"
    echo "0 -> master"
    echo "如果是其他分支请直接输入分支名称"
else
    echo "请输入要上传的分支名称"
    echo "0 -> master"
    echo "如果是其他分支请直接输入分支名称"
fi

while [ $handle == 2 ]; do
    read barch
    tempbarch=""
    if [ $barch == 0 ]; then
        echo "输入的是master"
        tempbarch="master"
    else
        echo "输入的是其他分支"
        tempbarch=$barch
    fi
    echo $tempbarch
    git pull origin $tempbarch
    if [ $? == 0 ]; then
        istrue=0
        echo $istrue
    else
        echo "请输入正确的分支名称"
    fi
done

while [ $istrue != 1 ]; do
    read barcha
    pushbarch=""
    if [ $barcha == 0 ]; then
        echo "输入的是master"
        pushbarch="master"
    else
        echo "输入的是其他分支"
        pushbarch=$barcha
    fi
    echo $pushbarch
    git push origin $pushbarch
    if [ $? == 0 ]; then
        istruetwo=0
        echo $istruetwo
    else
        echo "请输入正确的分支名称"
    fi
done
