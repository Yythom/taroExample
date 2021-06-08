import React from 'react';
import { View, Navigator, Text, Input } from '@tarojs/components';
import './search.scss'

const Search = ({
    isEditor, // 是否可编辑
    text, // placeholder
    width,
    height,
    background,
    className,
    onClick,
    onBlur,
    value,
    style
}) => {
    return (
        <View className={`searcj-wrap ${className}`} style={{ width: width, height: height, background, ...style }}>
            <View className='home-searchview'>
                {
                    isEditor
                        ? <View className='home-searchv' >
                            <Text className='iconfont icon-sousuo' />
                            <Input className='home-search home-search-input' value={value} onBlur={(e) => onBlur(e.detail.value)} placeholderStyle='color:#C8CDD1' placeholder={text}></Input>
                        </View>
                        : <View onClick={() => onClick()} className='home-searchv' >
                            <Text className='iconfont icon-sousuo' />
                            <View className='home-search'>{text}</View>
                        </View>
                }
            </View>
        </View>
    )
}
export default Search;
