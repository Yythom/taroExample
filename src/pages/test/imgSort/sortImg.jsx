/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { Image, MovableArea, MovableView, Text, View } from '@tarojs/components';
import { createSelectorQuery, vibrateShort } from '@tarojs/taro';
import './temp2.scss'

const SortImage = () => {
    const [pageInfo, setPageInfo] = useState({
        arrayNull: true,
        releaseText: '',
        replayMore: false,
        hidden: true,
        flag: false,
        x: 0,
        y: 0,
        tempFilePaths: [
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201410%2F20%2F20141020162058_UrMNe.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625200438&t=8b61eedb22d7fe73ebf478231a325132",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa3.att.hudong.com%2F61%2F98%2F01300000248068123885985729957.jpg&refer=http%3A%2F%2Fa3.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625200438&t=7ae153602695e06b6ce6bac93c0f75d3",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201209%2F08%2F20120908134318_YVAwx.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625200438&t=412b584cfaa1ad446e27a6e39054a6eb",
        ],
        disabled: true,
        elements: [],
        textHeight: '',
        maskImg: '',
        beginIndex: '',
    })
    // const [movableViewInfo, setMovableViewInfo] = useState({
    //     y: 0,
    //     x: 0,
    //     showClass: 'none',
    //     data: 'moren'
    // })

    useEffect(() => {
        setTimeout(() => {
            createSelectorQuery().selectAll(`.item`).boundingClientRect(function (rect) {
                if (rect[0]) {
                    let _pageInfo = JSON.parse(JSON.stringify(pageInfo));
                    _pageInfo.elements = rect
                    setPageInfo(_pageInfo);
                }
            }).exec()
        }, 200);
    }, [])


    function _longtap(e, item) {
        vibrateShort();
        let _pageInfo = JSON.parse(JSON.stringify(pageInfo));
        _pageInfo.maskImg = item
        const detail = e.detail;
        _pageInfo.x = detail.x - 75;
        _pageInfo.y = detail.y - _pageInfo.elements[0].top;
        _pageInfo.hidden = false;
        _pageInfo.disabled = false;
        _pageInfo.flag = true;
        setPageInfo(_pageInfo)
    }
    function touchStart(e, i) {
        let _pageInfo = JSON.parse(JSON.stringify(pageInfo));
        _pageInfo.beginIndex = i
        setPageInfo(_pageInfo)
    }
    function touchEnd(e) {
        if (!pageInfo.flag) {
            return;
        }
        let _pageInfo = JSON.parse(JSON.stringify(pageInfo));
        const x = e.changedTouches[0].pageX
        const y = e.changedTouches[0].pageY
        const list = _pageInfo.elements;
        let data = _pageInfo.tempFilePaths
        console.log(pageInfo.flag, _pageInfo.elements);
        for (var j = 0; j < list.length; j++) {
            const item = list[j];
            if (x > item.left && x < item.right && y > item.top && y < item.bottom) {
                console.log(item);
                const endIndex = j;
                const beginIndex = _pageInfo.beginIndex;

                //临时保存移动的目标数据
                let tem = data[beginIndex];
                //将移动目标的下标值替换为被移动目标的下标值
                data[beginIndex] = data[endIndex]
                //将被移动目标的下标值替换为beginIndex
                data[endIndex] = tem;
                console.log(data, endIndex, beginIndex);
                _pageInfo.tempFilePaths = data
            }
        }
        _pageInfo.hidden = true;
        _pageInfo.flag = false;
        _pageInfo.disabled = true;
        _pageInfo.maskImg = ''
        setPageInfo(_pageInfo);
    }

    function touchMove(e) {
        let _pageInfo = JSON.parse(JSON.stringify(pageInfo));
        let x = e.changedTouches[0].pageX
        let y = e.changedTouches[0].pageY - _pageInfo.elements[0].top
        // **//请着重 好好的 看看这里 朋友们 拖拽会不会出bug 就看这里了**
        //===============================>
        _pageInfo.x = x - 75
        _pageInfo.y = y
        setPageInfo(_pageInfo)

    }
    return (
        <View className='sort_wrap sort_img_wrap'>
            <View className='release_box'>
                {/* <!-- //顶部输入框 类似微信朋友圈 --> */}
                <MovableArea className='clearfix'>
                    {/* <!-- //tempFilePaths是我上传base64后，后台传回来的图片数组 --> */}
                    {
                        pageInfo?.tempFilePaths.map((e, i) => {
                            return (
                                <View
                                    key={i}
                                    className='pic_box item'
                                    onLongPress={(eve) => _longtap(eve, e)}
                                    onTouchStart={(eve) => touchStart(eve, i)}
                                    onTouchEnd={(eve) => touchEnd(eve, i)}
                                    onTouchMove={(eve) => touchMove(eve, i)}
                                >
                                    {/* <!-- //这里为什么要用data-list，因为九宫格，单张点击图片放大后，实现了左右滑动切换大图 --> */}
                                    <Image src={e} className='gays_pic_C' mode='widthFix' />
                                    {/* <!-- //关闭按钮 一个小× --> */}
                                    <Text className='del_pic iconfont icon-close'
                                    // bindtap='deletePic'
                                    //  data-id='{{index}}'
                                    />
                                </View>
                            )
                        })
                    }

                    {/* <!-- //把长按图片时候的图片路径 传过来 --> */}
                    <MovableView x={pageInfo.x} y={pageInfo.y} direction='all' damping='5000' friction='1'
                        disabled={pageInfo.disabled}
                    >
                        <View className='item-move'
                            style={{ display: pageInfo.hidden && 'none' }}
                        >
                            <Image src={pageInfo.maskImg} mode='widthFix' />
                        </View>
                    </MovableView>
                    <View
                        className='nullPic'
                    // bindtap='choose'
                    >
                        <Text className='iconfont icon-add' />
                    </View>
                </MovableArea>
            </View>

        </View>
    )
}
export default SortImage;


