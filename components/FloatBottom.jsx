import { RefInfo } from '@/common/publicFunc';
import { View } from '@tarojs/components';
import { createSelectorQuery, getStorageSync } from '@tarojs/taro';
import React, { memo, useEffect, useState } from 'react';
import './styles/float_bottom.scss'

const Float = ({ show, height = 1500, hide, setShow, className, style, children }) => {
    const hideFn = () => {
        if (show && typeof hide === 'function') {
            hide();
        }
    }
    const [top, setTop] = useState('');
    // useEffect(() => {
    //     setTop(initTop)
    // }, [])
    useEffect(() => {
        console.log(show);
        if (show) {
            // vibrateShort();
            setTop(-10)
        } else {
            RefInfo(`${className}`).then(res => {
                console.log(res, 'res');
                setTop(-(res.height + 10))
            })
            // (+getStorageSync('safeArea')
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
            <View className={`float_bottom  ${className}`} style={{ ...style, bottom: top ? top * 2 + 'rpx' : '-3999rpx', paddingBottom: getStorageSync('safeArea') * 2 + 10 + 'rpx' }}>
                {children}
            </View>
        </>

    )
}
export default memo(Float);
