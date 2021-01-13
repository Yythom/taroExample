import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { useSelector, shallowEqual } from 'react-redux';
import WithUserVerify from './WithUserVerify';
import './styles/avatar.scss';

const Avatar = ({ size }) => {
    const userStore = useSelector(e => e.userStore, shallowEqual);
    const userInfo = userStore.userInfo || null;
    return (
        <View className='avatar-wrap' style={size && { width: size + 'rpx', height: size + 'rpx' }}>
            <WithUserVerify onClick={() => console.log('头像')}>
                {
                    !userInfo && !userInfo?.avatar ? <Text class='iconfont icon-wode' style={{ fontSize: size + 'rpx' }} /> : (userInfo && userInfo.avatar && <Image src={userInfo.avatar} style={{ width: size + 'rpx', height: size + 'rpx' }} />)
                }
            </WithUserVerify>
        </View>
    )
}
export default Avatar;
