import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { lkHideLoading, lkShowLoading } from '@/common/publicFunc';
import { getStorageSync, hideLoading, removeStorageSync, setStorageSync, showLoading, showToast } from '@tarojs/taro';
import Search from './Search';
import './styles/history_search.scss'

const HistorySearch = ({
    storage_logkey, // 本地设置的stroge key名
    className,
    isShowHot, // 热门列表
    api, // 搜索api接口

    // list, // 嵌套时可由外层控制
    // setList,
}) => {
    const [list, setList] = useState([]);
    const [log, setLog] = useState([]); // 历史记录

    useEffect(() => {
        if (getStorageSync(storage_logkey)) {
            setLog(JSON.parse(getStorageSync(storage_logkey)))
        }
    }, [])


    const searchFn = async (text) => {
        if (!text) {
            showToast({ title: '请输入搜索的内容', icon: 'none' })
            return;
        }
        if (!log.includes(text)) { // 并且 历史不存在当前 输入框的值
            const $log = [...log, text];
            setStorageSync(storage_logkey, JSON.stringify($log)); // 添加新的历史
            setLog($log);
        }


        showLoading({ title: '加载中', })
        let _list = await api(text);
        if (_list) {
            hideLoading();
            if (_list.list[0]) {
                setList(_list.list)
            } else {
                showToast({ title: '暂无数据', icon: 'none' })
            }
        }
    }


    const clear = () => {
        setLog('');
        setList([]);
        removeStorageSync(storage_logkey);
    }

    return (
        <View className={`history_search_wrap ${className}`} >
            <Search isEditor onBlur={searchFn} width={700} height={100} text='搜索条件' />
            {
                isShowHot && <View className='hot_box'>
                    <View className='hot_title'>
                        <View className='text'>热门搜索</View>
                    </View>
                    <View className='hot_list'>
                        {[0, 1, 3].map(e => {
                            return (
                                <View className='item' key={'his' + e} >
                                    {e}
                                </View>
                            )
                        })}
                    </View>
                </View>
            }

            {
                log[0] ? <View className='history_box'>
                    <View className='history_title'>
                        <View className='text'>历史搜索</View>
                        <View className='iconfont icon-delete' onClick={() => { clear() }} ></View>
                    </View>
                    <View className='history_list'>
                        {log.map(e => {
                            return (
                                <View className='item' key={'his' + e} >
                                    {e}
                                </View>
                            )
                        })}
                    </View>
                </View> : <View className='list'>
                    {
                        list[0]
                    }
                </View>
            }

        </View>
    )
}
export default HistorySearch;
