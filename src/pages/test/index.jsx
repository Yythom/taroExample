/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-unused-vars */
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import React, { Component, useEffect, useState } from 'react';
import Taro, { getStorageSync, useDidShow, hideTabBar, navigateTo, setStorageSync, requirePlugin, getLogManager, getRealtimeLogManager, onError, useTabItemTap } from '@tarojs/taro';
import { View, Text, Canvas, Button, Image, Swiper, SwiperItem, Picker, Input, Slider, Progress, OpenData, WebView } from '@tarojs/components';
// import Modal from '@/components/Modal'
import NavBar from '@/components/NavBar'
// import Notice from '@/components/Notice'
import Search from '@/components/Search'
import Avatar from '@/components/Avatar'
import Tabs from '@/components/Tabs'
import UpImg from '@/components/UpImage'
import BlurImg from '@/components/BlurImg'
// import WithUserVerify from '@/components/WithUserVerify'
import TestService from '@/services/test'
import Float from '@/components/FloatBottom';
import { getLocal, lkGoToChangeLocation, lkShowModal, mapRoute } from '@/common/publicFunc';

import CheckList from '@/components/CheckList';
import DropDown from '@/components/DropDown';
import Sticky from '@/components/Sticky';
import HistorySearch from '@/components/HistorySearch';
import Vtabs from '@/components/Vtabs';
// import Modal from '@/components/Modal';

import { actions } from './store/slice'
import PickerExample from './PickerExample'
import { selectslist, vtablist, tabsList } from './data';
import './index.scss';

function Index() {
    const query = Taro.getCurrentInstance().router.params;
    // console.log(decodeURIComponent(query));
    // const chooseLocation = requirePlugin('chooseLocation'); // 引入腾讯位置服务的地图

    const [img, setImage] = useState(false);
    const testStore = useSelector(e => e.testStore, shallowEqual);
    const dispatch = useDispatch();

    useDidShow(() => {
        // const locationInfo = chooseLocation.getLocation();
        // if (locationInfo) {
        //     console.log(locationInfo, 'locationInfo');
        // }
    })
    const goToMap = () => {
        getLocal().then(res => {
            lkGoToChangeLocation(res.latitude, res.longitude)
        })
    }

    // tab 相关设置
    const [refresh_status, setRefresh_status] = useState(false);
    const [tag_id, setTag_id] = useState('');
    const change_tag = (id) => {
        setTag_id(id);
    }
    //////////////////////////////////

    useDidShow(() => {
        // getLocal().then(res => {   console.log(res); })
        // dispatch(actions.changeuserInfoActionAsync()) // 测试api
    })

    // 多项选择相关
    const [selectList, setSelect_list] = useState([])
    const [newList, setNewList] = useState([]);

    // 竖的tabs切换
    const [vtabindex, setVtabindex] = useState(0);

    return (
        <View className='test-h' >
            <NavBar background='pink' renderCenter={<Search isEditor width={300} height={40} />} />
            <View className='img_wrap' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <Avatar size={80}></Avatar>
                <CheckList
                    list={selectList[0] ? selectList : selectslist}
                    setList={setSelect_list}
                    setFilter={setNewList}
                    renderLeftMap={(item) => {
                        return <View className=''>{item.title}</View>
                    }}
                />

                <View onClick={() => goToMap()}>地图插件选点</View>
                <View className='pickers_wrap'>
                    <PickerExample />
                    <View onClick={() => { lkShowModal('123', '213').then(res => { console.log(res); }) }} >
                        modal
                    </View>
                </View>
            </View >

            <Sticky>
                <View className='tab' style={{ width: '100%', height: '80px', background: '#3a2b1a', color: '#fff' }}>
                    这是粘性头部 不可在flex元素内
                </View>
            </Sticky>
            <DropDown title='品牌'>
                <View className='child_list' style={{ height: '200rpx' }}>
                    {[2, 2, 3, 4, 5, 6, 7].map((e, i) => {
                        return (<View key={e} className='child_item'>{e}</View>)
                    })}
                </View>
            </DropDown>


            <View
                onClick={() => {

                    setStorageSync('cop_src', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3592591149,2523126110&fm=26&gp=0.jpg');
                    navigateTo({ url: '/subpages/img_cop/index' })
                }}
            >
                图片裁剪
            </View>
            <View className='' onClick={() => {
                navigateTo({ url: '/subpages/video_sp/index' })
            }}>仿抖音</View>
            {/* <UpImg btn_text='上传图片' /> */}
            <View onClick={() => {
                Taro.chooseLocation().then(res => {
                    console.log(res);
                })
                // mapRoute('目的地', 30.644, 104.04311); // 
                // Taro.openLocation({
                //     latitude: 30.643,	//维度
                //     longitude: 104.04311, //经度
                //     name: "目的地",	//目的地定位名称
                //     scale: 15,	//缩放比例
                //     address: "目的地"	//导航详细地址
                // })
            }}>一键导航</View>
            <View onClick={() => {
                navigateTo({ url: '/subpages/movie/index' })
            }} >
                电影选座
            </View>
            <View className='12312312lll' onClick={() => {
                console.log(aaa);
            }}>
                打印日志
            </View>
            <View className='12312312lll' onClick={() => { dispatch(actions.changeuserInfoActionAsync()) }}> 测试请求失败</View>

            <DropDown className='test_down' >
                <View className='c_wrap' style={{ height: '300rpx' }} >
                    {
                        selectslist[0] && selectslist.map(e => {
                            return (
                                <View className='c_item' key={e.title + 'drop'}>
                                    {e.title}
                                </View>
                            )
                        })
                    }
                </View>
            </DropDown>

            <View>
                <Tabs
                    tag_list={tabsList}
                    setTag_id={setTag_id}
                    onChange={change_tag}
                    defaultIndex='2'
                    height='300rpx' // scroll-view导致必须要有高
                    isRefresh
                    isSticy
                    refresh_status={refresh_status}
                    setRefresh_status={setRefresh_status}
                    refresh_handle={async () => {
                        let a = new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve(6666);
                            }, 500);
                        });
                        let res = await a; // http req
                        if (res) setRefresh_status(false);
                        console.log(res, 'a');
                    }}
                    scrollToLowerFn={async () => {
                        let a = new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve(6666);
                            }, 500);
                        });
                        let res = await a; // http req
                        console.log(res, 'a');
                        // http req
                    }}
                    parentClass='nav-parent'
                    childrenClass='children-class'
                >
                    <View className='a' style={{ height: '200px' }}>
                        {'targ' + tag_id}
                    </View>

                </Tabs>

            </View>
            <Vtabs list={vtablist} onChange={(i) => { setVtabindex(i) }} height='400rpx' windowTabsLength='5' >
                {
                    vtablist[vtabindex].pro.map(e => {
                        return (
                            <View className='' style={{ height: '80%' }} key={e}>{e.name}</View>
                        )
                    })
                }
            </Vtabs>

            <HistorySearch storage_logkey='search_log' api={TestService.get_ShopListApi} />
        </View>
    )
}

export default Index