import React from 'react';
import { View, Navigator, Text, Input } from '@tarojs/components';
import './styles/search.scss'

const Search = ({
    isEditor, // 是否可编辑
    text, // placeholder
    url, // 跳转的url
    width,
    height,
    background,
    isTab // 是否为主包tab跳转
}) => {
    return (
        <View className='searcj-wrap'>
            <View className='home-searchview'>
                {
                    isEditor
                        ? <View className='home-searchv' style={{ width: width + 'rpx', height: height + 'rpx', background, }}>
                            <Text className='iconfont icon-sousuo' />
                            <Input className='home-search home-search-input' placeholderStyle='color:#C8CDD1' placeholder={text}></Input>
                        </View>
                        : <Navigator openType={isTab ? 'switchTab' : 'navigate'} url={url} className='home-searchv' style={{ width: width + 'rpx', height: height + 'rpx', background, }}>
                            <Text className='iconfont icon-sousuo' />
                            <View className='home-search'>{text}</View>
                        </Navigator>
                }
            </View>
        </View>
    )
}
export default Search;
