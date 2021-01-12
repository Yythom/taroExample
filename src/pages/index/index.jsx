import { useSelector, shallowEqual } from 'react-redux';
import React, { Component, useState } from 'react';
import Taro, { getStorageSync, useDidShow, hideTabBar } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';

import NavBar from '@/components/NavBar'
import './index.scss';

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
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <View
                    onTouchStart={(e) => touchStart(e)}
                    onTouchEnd={(e) => { touchEnd(e) }}
                    // onLongPress={(e) => longPressFn(e)}
                    style={{ width: '100%', height: '300rpx', background: 'red' }}
                >
                    按钮
                </View>
                {
                    touchFlag && '88888'
                }
            </View >
        </View>
    )
}
export default Index