import { useSelector, shallowEqual } from 'react-redux';
import React, { Component, useState } from 'react';
import Taro, { getStorageSync, useDidShow, hideTabBar } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

import NavBar from '@/components/NavBar'
import './index.scss';
import Step from '@/components/Step';

function Index() {
    const userStore = useSelector(e => e.userStore, shallowEqual);


    useDidShow(() => {
        console.log(userStore);
    })

    const longPressFn = (e) => {
        console.log(e, '长按');
        setTouchFlag(true)
    }

    const [touchStartTime, setTouchStartTime] = useState(0);
    const [touchFlag, setTouchFlag] = useState(false);
    const touchStart = (e) => {
        setTouchStartTime(e.timeStamp);
        console.log(e, '开始');
    }
    const touchEnd = (e) => {
        console.log(e, '结束');
        if (e.timeStamp - touchStartTime > 500) {
            setTouchFlag(true)
        }
    }
    return (
        <View className='index-wrap' >
            <NavBar background='pink' title='首页' />
            <View >
                首页
            </View >
        </View>
    )
}
export default Index