import { View } from '@tarojs/components';
import { getStorageSync } from '@tarojs/taro';
import React, { memo, useEffect, useState } from 'react';
import './styles/float_bottom.scss'

const Float = ({ show, height, hide, setShow, className, style, children }) => {
    const hideFn = () => {
        if (show && typeof hide === 'function') {
            hide();
        }
    }
    const [top, setTop] = useState('');

    useEffect(() => {
        console.log(show);
        if (show) {
            // vibrateShort();
            setTop(-10)
        } else {
            setTop(-(height + 10 + (+getStorageSync('safeArea'))))
        }
    }, [show]);

    return (
        <>
            {
                show
                && <View className='modal-mask' onClick={
                    () => {
                        hideFn();
                        setShow(!show);
                    }
                }
                />
            }
            <View className={`float_bottom  ${className}`} style={{ ...style, bottom: top, paddingBottom: getStorageSync('safeArea') * 2 + 10 + 'rpx' }}>
                {children}
            </View>
        </>

    )
}
export default memo(Float);
