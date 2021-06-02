/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text, Video } from '@tarojs/components';

import NavBar from '@/components/navbar/NavBar';
// import NavBar from '../../wx_components/wxml-to-canvas/src/index';
import Taro, { getCurrentInstance, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import './index.scss'


const Index = () => {
    Taro.useDidShow(() => {
        Taro.showShareMenu();
    })
    Taro.useShareAppMessage(res => {
        console.log(res, 'res');
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }

        // return {
        //     title: '自定义转发标题',
        //     path: '/page/user?id=123'
        // }
    })
    usePullDownRefresh(() => {
        ///
        stopPullDownRefresh();
    })
    const [ex, setEx] = useState(null); // 实例

    function getCanvas() { // 需要获取页面实例的时候
        const its = getCurrentInstance();
        let its_ex = its.page.selectComponent('#widget');
        if (its_ex) {
            setEx(its_ex);
        } else {
            setTimeout(() => {
                getCanvas()
            }, 200);
        }
        return its_ex
    }

    useDidShow(() => {
    })

    return (
        <View className='wx_native_wrap'>
            <NavBar back title='原生小程序插件使用' />

        </View>
    )
}
export default Index;
