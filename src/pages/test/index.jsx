/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-unused-vars */
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import React, { Component, useEffect, useState } from 'react';
import Taro, { getStorageSync, useDidShow, hideTabBar, navigateTo, setStorageSync } from '@tarojs/taro';
import { View, Text, Canvas, Button, Image, Swiper, SwiperItem, Picker, Slider, Progress, OpenData } from '@tarojs/components';
// import Modal from '@/components/Modal'
import NavBar from '@/components/NavBar'
// import Notice from '@/components/Notice'
import Search from '@/components/Search'
import Avatar from '@/components/Avatar'
import Tabs from '@/components/Tabs'
import UpImg from '@/components/Up_image'
import BlurImg from '@/components/BlurImg'
// import WithUserVerify from '@/components/WithUserVerify'
import TestService from '@/services/test'

import { actions } from './store/slice'

import './index.scss';

function Index() {
    const query = Taro.getCurrentInstance().router.params;
    // console.log(decodeURIComponent(query));

    const [img, setImage] = useState(false);
    const testStore = useSelector(e => e.testStore, shallowEqual);
    const dispatch = useDispatch();


    // tab 相关设置
    const [refresh_status, setRefresh_status] = useState(false);
    const [tag_id, setTag_id] = useState('');
    const [content_list, setContent_list] = useState(['test']);
    const [list, setList] = useState([
        { title: '首页', tag_id: '101' },
        { title: '测试', tag_id: '102' },
        { title: '我的', tag_id: '103' },
        { title: 'hello', tag_id: '104' },
        { title: '测试-1', tag_id: '105' },
        { title: '测试-2', tag_id: '106' },
        { title: '测试-3', tag_id: '107' },
        { title: '测试-4', tag_id: '108' },
        { title: '测试-5', tag_id: '109' },
    ])

    const change_tag = (id) => {
        console.log(id);
        setTag_id(id);
        setContent_list([id]);
    }

    // ////////////////////////////////

    useDidShow(() => {
        change_tag(list[0]?.tag_id); // 初始化默认选中tag——id

        dispatch(actions.changeuserInfoActionAsync())
    })


    return (
        <View className='test-h' >
            <NavBar background='pink' renderCenter={<Search isEditor width={300} height={40} />} />
            <View className='img_wrap' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <Avatar size={80}></Avatar>

                {/* <Button onClick={() => {
                    Taro.navigateTo({
                        url: '/subpages/create_pages_demo/demo_pages/example/index'
                    })
                }}
                >跳转分包</Button> */}
                <View className='pickers_wrap'>
                    <Picker mode='region' value={["浙江省", "杭州市", "西湖区"]} onChange={((e) => {
                        console.log(e);
                    })}
                    >
                        <View className='picker'>
                            省市：
                    </View>
                    </Picker>
                    <Picker mode='time' value='00:04' onChange={((e) => {
                        console.log(e);
                    })}
                    >
                        <View className='picker'>
                            时间：
                    </View>
                    </Picker>
                    <Picker mode='date' value='2021-02-12' onChange={((e) => {
                        console.log(e);
                    })}
                    >
                        <View className='picker'>
                            日期：
                    </View>
                    </Picker>
                    <Picker mode='multiSelector' range={[['123', '32'], '中国', '1']} onChange={((e) => {
                        console.log(e);
                    })}
                    >
                        <View className='picker'>
                            自定义：
                    </View>
                    </Picker>
                    <Picker mode='selector' range={['美国', '中国', '巴西', '日本']} >
                        <View className='picker'>
                            当前选择：
                    </View>
                    </Picker>
                </View>
            </View >



            <View
                onClick={() => {

                    setStorageSync('cop_src', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3592591149,2523126110&fm=26&gp=0.jpg');
                    navigateTo({ url: '/subpages/img_cop/index' })
                }}
            >
                图片裁剪
            </View>

            {/* <UpImg btn_text='上传图片' /> */}

            <View>
                <Tabs
                    tag_list={list}
                    tag_id={tag_id}
                    setTag_id={setTag_id}
                    onChange={change_tag}
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
                        if (res) setRefresh_status(false);
                        console.log(res, 'a');
                        // http req
                    }}
                    parentClass='nav-parent'
                    childrenClass='children-class'
                >
                    <View>111----{tag_id}</View>

                </Tabs>
            </View>

        </View>
    )
}
export default Index