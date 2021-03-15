import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { lkHideLoading, lkShowLoading } from '@/common/publicFunc';
import { getStorageSync, removeStorageSync, setStorageSync, showToast } from '@tarojs/taro';
import Search from './Search';
import './styles/history_search.scss'

const HistorySearch = ({ storage_logkey, className, isShowHot, api }) => {

    const [log, setLog] = useState([]); // 历史记录
    const [list, setList] = useState([]);

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


        lkShowLoading('加载中'); // 请求函数
        let shop_list = await api(text);
        if (shop_list) {
            if (shop_list.list[0]) {
                setList(shop_list.list)
            } else {
                showToast({ title: '暂无数据', icon: 'none' })
            }
        }
        lkHideLoading();

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
                log[0] && <View className='history_box'>
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
                </View>
            }

        </View>
    )
}
export default HistorySearch;
