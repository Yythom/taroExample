import React from 'react';
import { View, Image, Text } from '@tarojs/components';


import './styles/checklist.scss';

function CList(props) {
    let { className, list, setList, onClick, setFilter } = props;
    return (
        <View className={`check_wrap ${className}`}>
            {list[0] && list.map((e, i) => {
                return (
                    <View className='check_item' key={e + 'check_item'} onClick={() => {
                        let autoList = JSON.parse(JSON.stringify(list));
                        autoList[i].checked = !autoList[i].checked;
                        setList(autoList);
                        setFilter(autoList.filter(el => el.checked));
                        if (typeof onClick === 'function') {
                            onClick();
                        }
                    }}
                    >
                        <View className='left'>
                            {e?.checked ? <Text className='iconfont icon-squarecheckfill' /> : <Text className='iconfont icon-square' />}
                        </View>
                        <View className='right'>
                            {e.title}
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

export default CList;
