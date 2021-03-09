import React from 'react';
import { View, Text } from '@tarojs/components';

import NavBar from '@/components/NavBar';
import Taro, { stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
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

    return (
        <View className='index-wrap'>
            <NavBar back title='' />
            测试分包
        </View>
    )
}
export default Index;
