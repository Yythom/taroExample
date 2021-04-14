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
    api, // 搜索api接口 {api,params:{}}

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


    const searchFn = async (_text) => {
        if (!_text) {
            setList([]);
            setItem('')
            return;
        }
        if (!log.includes(_text)) { // 并且 历史不存在当前 输入框的值
            const $log = [...log, _text];
            setStorageSync(storage_logkey, JSON.stringify($log)); // 添加新的历史
            setLog($log);
        }


        showLoading({ title: '加载中', })
        let _list = await api.api({ ...api.params });
        if (_list) {
            hideLoading();
            if (_list.list[0]) {
                setPage(1);
                setTotal(_list.total)
                setList(_list.list)
            } else {
                showToast({ title: '暂无数据', icon: 'none' })
            }
        }
        setItem(_text)
    }


    // 分页相关
    const [page, setPage] = useState('');
    const [total, setTotal] = useState('');
    const [req, setReq] = useState(false);
    const paging = async () => {
        if (total > 10 && list.length !== total && !req) {
            if (total === list.length) {
                showToast({ title: '到底了' });
                // return
            }
            showLoading('加载中...')
            setReq(true)
            let res = await api.api({ ...api.params, page: page + 1 });
            if (res) {
                console.log(res, 'res----------paging');
                setPage(page + 1);
                setList([...list, ...res.list])
                if (total != res.total) {
                    setTotal(res.total);
                }
            }
            setReq(false)
            hideLoading();
        }
    }

    useReachBottom(() => {
        paging();
    })

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
