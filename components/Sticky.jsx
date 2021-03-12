import React from 'react';
import { View, Image } from '@tarojs/components';
import { getStorageSync } from '@tarojs/taro';


const Sticky = ({ className, children }) => {
    return (
        <View className={className} style={{ position: 'sticky', top: getStorageSync('navHeight') + 'px' }}>
            {children}
        </View>
    )
}
export default Sticky;
