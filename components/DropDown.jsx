
import React, { useState } from 'react';
import { View } from '@tarojs/components';

import './styles/dropdown.scss';

function DropDown(props) {
    let { className, title } = props;
    const [flag, setFlag] = useState(false);

    return (
        <View className={`drop_wrap ${className}`}>
            <View className='drop_title' onClick={() => { setFlag(!flag) }}>{title || '请定义标题'}</View>
            <View className='square' style={!flag ? { height: 0 } : { height: props.children?.props?.style?.height || 0 }}>
                {props.children}
            </View>
        </View>
    )
}

export default DropDown;


