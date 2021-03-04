
import React from 'react';
import { View, Image, Text } from '@tarojs/components';


import './styles/dropdown.scss';
import { useState } from 'react';

function DropDown(props) {
    let { className, list, setList, onClick, } = props;
    const [flag, setFlag] = useState(false);

    return (
        <View className={`drop_wrap ${className}`}>
            <View className='drop_title' onClick={() => { setFlag(!flag) }}>测试下拉</View>
            <View className='square' style={!flag ? { height: 0 } : { height: props.children?.props?.style?.height || 0 }}>
                {props.children}
            </View>
        </View>
    )
}

export default DropDown;


