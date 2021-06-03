/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { Text, View } from '@tarojs/components';
import { lkHideLoading, lkShowLoading } from '@/common/publicFunc';
import { getStorageSync, hideLoading, navigateTo, openLocation, removeStorageSync, setStorageSync, showLoading, showToast, useReachBottom } from '@tarojs/taro';
import BlurImg from '@/components/blur-img/BlurImg'
import { formatKm, Star } from '@/common/public';
import Search from '@/components/search/Search';
import './history_search.scss'

const HistorySearch = ({
    storage_logkey, // 本地设置的stroge key名
    className,
    isShowHot, // 热门列表
    api, // 搜索api接口
    renderCenter, // 筛选jsx
    text
    // list, // 嵌套时可由外层控制
    // setList,
}) => {
    const [list, setList] = useState([]);
    const [log, setLog] = useState([]); // 历史记录
    const [item, setItem] = useState('')

    useEffect(() => {
        if (getStorageSync(storage_logkey)) {
            setLog(JSON.parse(getStorageSync(storage_logkey)))
        }
    }, [])

    // useEffect(() => {
    //     searchFn(item) // 筛选内容改变重搜索
    // }, [api?.params?.sort])

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
        console.log(api.params);
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
                showToast({ title: '到底了', icon: 'none' });
                return
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
        paging()
    })
    const clear = () => {
        setLog('');
        setList([]);
        removeStorageSync(storage_logkey);
    }

    return (
        <View className={`history_search_wrap ${className}`}  >
            <Search isEditor width='97%' value={item} onBlur={searchFn} height='34px' text={text} style={{ top: getStorageSync('navHeight') + 'px' }} />
            {
                list[0] && renderCenter
            }

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
                log[0] ? !list[0] && <View className='history_box'>
                    <View className='history_title'>
                        <View className='text'>历史搜索</View>
                        <View className='iconfont icon-delete' onClick={() => { clear() }} ></View>
                    </View>
                    <View className='history_list'>
                        {log.map(e => {
                            return (
                                <View className='item' key={'his' + e} onClick={() => searchFn(e)}>
                                    {e}
                                </View>
                            )
                        })}
                    </View>
                </View> : <View className='history_box' style={{ marginTop: '12px', textAlign: 'center', color: '#555' }}>暂无搜索记录</View>
            }

            {
                <View className='list'>
                    {
                        list[0] && list.map(e => {
                            return (
                                <View className=' animation' key={e.shop_id + '_1'} onClick={() => navigateTo({ url: `/subpages/offline_shop/index?shop_id=${e.shop_id}&merchant_id=${e.merchant_id}` })}>

                                </View>
                            )
                        })
                    }
                </View>
            }
        </View >
    )
}
export default HistorySearch;
