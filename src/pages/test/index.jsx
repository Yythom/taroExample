/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-unused-vars */
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import React, { Component, useEffect, useState } from 'react';
import Taro, { getStorageSync, useDidShow, hideTabBar, navigateTo, setStorageSync, requirePlugin, getLogManager, getRealtimeLogManager, onError, useTabItemTap, useShareAppMessage } from '@tarojs/taro';
import { View, Text, Canvas, Button, Image, Swiper, SwiperItem, Picker, Input, Slider, Progress, OpenData, WebView } from '@tarojs/components';
// import Modal from '@/components/modal（暂放）/Modal'
import NavBar from '@/components/navbar/NavBar'
// import Notice from '@/components/Notice'
import Search from '@/components/search/Search'
import Avatar from '@/components/avatar/Avatar'
import Tabs from '@/components/tabs/Tabs'
import UpImg from '@/components/upload-img/Uploadimg'
import BlurImg from '@/components/blur-img/BlurImg'
// import WithUserVerify from '@/components/WithUserVerify'
import TestService from '@/services/test'
import FloatBottom from '@/components/float/FloatBottom';
import { getLocal, lkGoToChangeLocation, lkShowModal, mapRoute } from '@/common/publicFunc';
import Drop from '@/components/drop/DropDwon';
import CheckList from '@/components/check-box/CheckBox';
import Sticky from '@/components/Sticky';
import HistorySearch from '@/components/histoty-search/HistorySearch';
import Vtabs from '@/components/v-tabs/Vtabs';
import Modal from '@/components/modal/Modal';

import { actions } from './store/slice'
import PickerExample from './PickerExample'
import { selectslist, vtablist, tabsList } from './data';
import './index.scss';

function Index() {
    const [show, setShow] = useState(false)
    const query = Taro.getCurrentInstance().router.params;
    // console.log(decodeURIComponent(query));
    // const chooseLocation = requirePlugin('chooseLocation'); // 引入腾讯位置服务的地图

    const [img, setImage] = useState(false);
    const testStore = useSelector(e => e.testStore, shallowEqual);
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
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
    // const [refresh_status, setRefresh_status] = useState(false);
    const [content, setContent] = useState([])
    const [index, setIndex] = useState('');
    const change_tag = (id) => {
        setIndex(id);
    }

    useDidShow(() => {
        TestService.getTestList().then(res => {
            setContent(res.list)
        })
        // getLocal().then(res => {   console.log(res); })
        // dispatch(actions.changeuserInfoActionAsync()) // 测试api
    })

    // 竖的tabs切换
    const [vtabindex, setVtabindex] = useState(0);

    // 
    const [drop, setDrop] = useState(false)
    const [drop1, setDrop1] = useState(false)

    const [init, setInit] = useState(false)
    return (
        <View className='test-h' >
            <NavBar background='pink' renderCenter={<Search isEditor width={300} height={40} />} />
            <View className='img_wrap' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <Avatar size={80}></Avatar>
                <CheckList
                    list={[{ title: 'a' }, { title: 'b', }]}
                    onChange={(list, isSelectAll) => {
                        console.log(list, isSelectAll);
                        // setSelect_list(list)
                    }}
                    renderLeftItem={(item) => {
                        return <View className=''>{item.title}</View>
                    }}
                />

                <View onClick={() => goToMap()}>地图插件选点</View>
                <View className='pickers_wrap'>
                    <PickerExample />
                </View>
            </View >
            <Button onClick={() => setModal(!modal)}>modal</Button>
            <Modal show={modal} setShow={setModal} />

            <Sticky>
                <View className='tab' style={{ width: '100%', height: '80px', background: '#3a2b1a', color: '#fff' }}>
                    这是粘性头部 不可在flex元素内
                </View>
            </Sticky>


            <View onClick={() => { setStorageSync('cop_src', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3592591149,2523126110&fm=26&gp=0.jpg'); navigateTo({ url: '/subpages/img_cop/index' }) }} >
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
            <View onClick={() => { console.log(aaa); }}>
                打印日志
            </View>
            <View onClick={() => { dispatch(actions.changeuserInfoActionAsync()) }}> 测试请求失败</View>

            <View className=''>
                <Text style={{ marginRight: '20rpx' }} onClick={() => { setDrop(!drop); setDrop1(false) }}>开关下拉1</Text>
                <Text onClick={() => { setDrop1(!drop1); setDrop(false) }}>开关下拉2</Text>
                <Drop
                    spaceName='test'
                    setShow={() => { setDrop(!drop); setDrop1(false) }}
                    show={drop}
                    itemHeight='60'
                    onChange={(type) => {
                        console.log('选择了=----', type);
                    }}
                    list={[{ text: '2', }, { text: '2', }, { text: '2', }, { text: '3', }]}
                />
                <Drop
                    spaceName='test'
                    setShow={() => { setDrop1(!drop1); setDrop(false) }}
                    show={drop1}
                    itemHeight='50'
                    onChange={(type) => {
                        console.log('选择了=----', type);
                    }}
                    list={[{ text: '2', }, { text: '2', }, { text: '2', }, { text: '3', }]}
                />
            </View>

            <View onClick={() => setShow(true)} >打开float</View>
            <View>
                <Tabs
                    tag_list={tabsList}
                    onChange={change_tag}
                    defaultIndex='2'
                    maxHeight={'300rpx'}
                    isRefresh
                    isSticy
                    initTabs={init}
                    // notChildScroll
                    request={{
                        params: {
                            page: 1,
                            // brand: tabsList[index]
                            brand: '',
                        },
                        http: TestService.getTestList
                    }}
                    onScrollBottom={(_newList) => {
                        setContent([...content, ..._newList?.list])
                    }}
                    init={(_newList) => {
                        setContent(_newList?.list)
                    }}
                >
                    {
                        content[0] && content.map(e => {
                            return (
                                <View onClick={() => {
                                    setInit(!init)
                                }} style={{ height: '300px', background: 'pink' }} key={e.shop_id + e.shop_name}>{e.shop_name}</View>
                            )
                        })
                    }

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


            <FloatBottom show={show} setShow={setShow} className='_float_test' style={{ padding: '1.2rem 2rem' }}>
                <View style={{ background: '#333', height: '600rpx', width: '100%' }}>111</View>
            </FloatBottom>

            <HistorySearch storage_logkey='search_log' api={TestService.get_ShopListApi} />
        </View>
    )
}

export default Index