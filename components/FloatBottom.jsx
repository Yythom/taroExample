import React, { memo, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import { getStorageSync } from '@tarojs/taro';
import np from 'number-precision'
import './styles/float_bottom.scss'

const Float = (props) => {
    const hideFn = () => {
        if (props?.show && typeof props.hideFn === 'function') {
            props.hideFn();
        }
    }
    const common_style = {

    }
    return (
        <>
            {
                props.show
                && <View className='modal-mask' onClick={
                    () => {
                        hideFn();
                        props.setShow(!props.show);
                    }
                }
                />
            }
            <View className={`float_bottom  ${props.className}`} style={!props.show ? { height: 0, ...common_style } : { ...common_style, height: np.plus(props.children?.props?.style?.height.replace('px', ''), getStorageSync('safeArea')) + 'px' || 0 }}>
                {props.children}
            </View>
        </>

    )
}
export default memo(Float);
