import React from 'react';
import { View, Image, Text } from '@tarojs/components';


import './checklist.scss';

function CList(props) {
    let { className, list, onClick, renderLeftMap } = props;
    return (
        <View className={`check_wrap ${className}`}>
            {list[0] && list.map((e, i) => {
                return (
                    <View className='check_item' key={e + 'check_item'} onClick={() => {
                        let autoList = JSON.parse(JSON.stringify(list));
                        autoList[i].checked = !autoList[i].checked;
                        if (typeof onClick === 'function') {
                            onClick(autoList);
                        }
                    }}
                    >
                        <View className='left'>
                            {e?.checked ? <Text className='iconfont icon-squarecheckfill' /> : <Text className='iconfont icon-square' />}
                        </View>
                        <View className='right'>
                            {renderLeftMap ? renderLeftMap(e) : null}
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

export default CList;
