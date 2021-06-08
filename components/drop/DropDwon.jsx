import { View } from '@tarojs/components';
import React, { useState } from 'react';
import './drop.scss'

const Drop = ({
    show = false,
    setShow = Function.prototype,
    onChange,
    itemHeight = 30,
    list = [],
    spaceName = '必填',
}) => {
    const [item, setItem] = useState(null)
    const _onChange = (i) => {
        if (typeof onChange === 'function') {
            onChange(i);
        }
        setItem(i)
    }

    return (
        <View className={(show && 'act_drop_wrap') + ' drop_wrap'}>
            <View className='list_wrap' style={{ height: show ? itemHeight * list.length + 'rpx' : 0 }}>
                {
                    list.map((e, i) => {
                        return (
                            <View className={(item === e && 'act_drop_item') + ' drop_item'} onClick={() => { _onChange(e) }} style={{ height: show ? itemHeight + 'rpx' : 0, transition: '300ms' }} key={spaceName + i}>{e.text}</View>
                        )
                    })
                }
            </View>
            {
                show
                && <View className='drop-mask' style={{ top: show ? itemHeight * list.length + 'rpx' : 0 }} onClick={
                    () => {
                        setShow(!show);
                    }
                }
                />
            }
        </View>
    )
}
export default Drop;
