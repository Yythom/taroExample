import React from 'react';
import { View, Image } from '@tarojs/components';


const Page = ({ className, children }) => {
    return (
        <View className={className}>
            {children}
        </View>
    )
}
export default Page;
