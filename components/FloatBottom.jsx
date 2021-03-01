import React, { memo, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import './styles/float_bottom.scss'

const Float = (props) => {
    const hideFn = () => {
        if (props?.show && typeof props.hideFn === 'function') {
            props.hideFn();
        }
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
            <View className={`float_bottom  ${props.className}`} style={!props.show ? { height: 0 } : { height: props.children?.props?.style?.height || 0 }}>
                {props.children}
            </View>
        </>

    )
}
export default memo(Float);
