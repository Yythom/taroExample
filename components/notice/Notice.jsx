import React from 'react';
import { View, Text } from '@tarojs/components';
import './notice.scss'

const RollingNotice = (props) => { //rolling notice 横向滚动公告
    const { isShow, content, background, color } = props;
    return (
        <>
            {
                isShow && <View className='notice-wrap' style={{ background }}>
                    <Text style={{ color }}>{content}</Text>
                </View>
            }
        </>
    )
}

export default RollingNotice;
