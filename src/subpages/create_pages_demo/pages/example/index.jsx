import React from 'react';
import { View } from '@tarojs/components';

import Taro from '@tarojs/taro'
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
    return (<View className='index-wrap'>
        测试分包
    </View>)
}
export default Index;
