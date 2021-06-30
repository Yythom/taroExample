/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Swiper, SwiperItem } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import './banner.scss'


const Banner = ({
    w,
    h,
    list = [
        'https://img2.baidu.com/it/u=2790689811,54471194&fm=26&fmt=auto&gp=0.jpg',
        'https://img0.baidu.com/it/u=2584226893,3395351634&fm=26&fmt=auto&gp=0.jpg'
    ],
    className,
    style,
    render = () => false,
}) => {
    const [index, setindex] = useState(0);
    useLayoutEffect(() => {
        if (!render()) {
            console.error('banner props render is not')
        }
    }, [])

    return (
        <View
            className={'banner_wrap ' + className}
            style={{ ...style, height: h, width: w }}
        >
            <Swiper
                className={'banner ' + className}
                indicatorColor='#999'
                indicatorActiveColor='#333'
                interval={5000}
                circular
                indicatorDots
                autoplay
                onChange={(e) => {
                    setindex(e.detail.current)
                }}
            >
                {
                    list.map((e, i) => {
                        return <SwiperItem key={`banner_${i}`}>
                            {render(e)}
                        </SwiperItem>
                    })
                }
            </Swiper>
            <View className='pag fc'>
                <View className='pre'>{index + 1}</View>/
                <View className='next'>{list.length}</View>
            </View>
        </View>

    )
}
export default Banner;
