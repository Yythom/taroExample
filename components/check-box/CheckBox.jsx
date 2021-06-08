/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import './checkBox.scss';

function CList(props) {
    const {
        className,
        onChange,
        renderLeftItem
    } = props;

    const [list, setList] = useState([])
    useEffect(() => {
        if (props.list) setList(props.list);
    }, [])

    return (
        <View className={`check_wrap ${className}`}>
            {
                list[0] && list.map((e, i) => {
                    return (
                        <View className='check_item' key={e + 'check_item'} onClick={(eve) => {
                            eve.stopPropagation();
                            let autoList = JSON.parse(JSON.stringify(list));
                            autoList[i].checked = !autoList[i].checked;
                            setList(autoList)
                            if (typeof onChange === 'function') {
                                let filter = JSON.parse(JSON.stringify(autoList)).filter(item => {
                                    return item.checked
                                })
                                filter.forEach(element => {
                                    delete element.checked
                                });
                                /**
                                 * @param {*} filter 选中的数组
                                 * @param {boolean}  boolean 是否全部选择传入的list
                                 */
                                onChange(filter, filter.length === list.length);
                            }
                        }}
                        >
                            <View className='left'>
                                {e?.checked ? <Text className='iconfont icon-squarecheckfill' /> : <Text className='iconfont icon-square' />}
                            </View>
                            <View className='right'>
                                {renderLeftItem ? renderLeftItem(e) : null}
                            </View>

                        </View>
                    )
                })
            }
        </View>
    )
}

export default CList;
