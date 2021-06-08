import React, { memo, useEffect, useState } from 'react'
import { setStorageSync, switchTab } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { systemInfo } from '@/common/publicFunc';
import { actions } from './store/slice'
import './index.scss'

const bar_height = '60';

export default memo(() => {
    const dispatch = useDispatch();
    const tabbarState = useSelector(state => state.tabbar, shallowEqual);
    //去除底部安全区
    useEffect(() => {
        if (systemInfo.model.indexOf('iPhone X') !== -1 || systemInfo.model.indexOf('iPhone 11') !== -1 || systemInfo.model.indexOf('iPhone 12') !== -1) {
            setStorageSync('safeArea', systemInfo.safeArea.top);
        } else {
            setStorageSync('safeArea', 5);
        }
        setStorageSync('bar_height', bar_height);

    }, [])
    const [tabBars] = useState([
        {
            url: '/pages/test/index',
            text: '测试',
            icon: <Text className='iconfont icon-square' />,
            iconColor: '',
            activeIcon: <Text className='iconfont  icon-squarecheckfill' />,
            activeIconColor: '',
        },
        {
            url: '/pages/index/index',
            text: '首页',
            icon: <Text className='iconfont icon-square' />,
            iconColor: '',
            activeIcon: <Text className='iconfont icon-squarecheckfill' />,
            activeIconColor: '',
        },
    ])

    const handleClick = (url, index) => {
        switchTab({
            url,
            // success: () => { /* 解决点击底部的tab的重复点击，页面没有重新刷新调用接口 */
            //     var page = getCurrentPages().pop();
            //     if (page == undefined || page == null) return;
            //     page.onLoad();
            // }
        })
        dispatch(actions.changetab(index))
    }

    return (
        <View className='tabbar-wrap' style={{ height: bar_height * 2 + 'rpx', paddingBottom: `env(safe-area-inset-bottom)` }} >
            {
                tabBars[0] && tabBars.map((item, index) => {
                    return (
                        <View key={item.url} className={`${index === tabbarState.active ? 'text-main _widthAuto' : '_widthAuto'}`} onClick={() => handleClick(item.url, index)} >
                            <View className='icon_wrap' style={{ borderRadius: '50%', }}>
                                <View style={index === tabbarState.active && item.activeIcon ? { color: item.activeIconColor } : { color: item.iconColor }}>
                                    {
                                        index === tabbarState.active && item.activeIcon ? item.activeIcon : item.icon
                                    }
                                </View>

                            </View>
                            <Text style={index === tabbarState.active && item.activeIcon ? { color: item.activeIconColor } : { color: item.iconColor }}>{item.text}</Text>
                        </View>
                    )
                })
            }

        </View>
    )
})


