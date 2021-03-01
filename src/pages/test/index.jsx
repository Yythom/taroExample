/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-unused-vars */
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import React, { Component, useEffect, useState } from 'react';
import Taro, { getStorageSync, useDidShow, hideTabBar, navigateTo, setStorageSync, requirePlugin } from '@tarojs/taro';
import { View, Text, Canvas, Button, Image, Swiper, SwiperItem, Picker, Input, Slider, Progress, OpenData } from '@tarojs/components';
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
import Float from '@/components/FloatBottom';
import { getLocal, lkGoToChangeLocation, mapRoute } from '@/common/publicFunc';

import { actions } from './store/slice'
import './index.scss';

// import Modal from '@/components/Modal';

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
    const [list, setList] = useState([
        { title: '首页', status: '101' },
        { title: '测试', status: '102' },
        { title: '我的', status: '103' },
        { title: 'hello', status: '104' },
        { title: '测试-1', status: '105' },
        { title: '测试-2', status: '106' },
        { title: '测试-3', status: '107' },
        { title: '测试-4', status: '108' },
        { title: '测试-5', status: '109' },
    ])
    const [tag_id, setTag_id] = useState('');

    const change_tag = (id) => {
        setTag_id(id);
    }

    // ////////////////////////////////

    useDidShow(() => {
        change_tag(101); // 初始化默认选中tag——id
        // getLocal().then(res => {
        //     console.log(res);
        // })
        dispatch(actions.changeuserInfoActionAsync())
    })
    const [ifocus, setIfocus] = useState(false)
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

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

                <View onClick={() => goToMap()}>地图选点</View>
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
                    <View onClick={() => setIfocus(true)}> 获取focus</View>
                    <Input type='number' style={{ position: 'fixed', top: '-99999px' }} onBlur={() => { setIfocus(false) }} focus={ifocus}></Input>
                    <View onClick={() => {
                        Taro.showModal({
                            title: '提示',
                            content: '这是一个模态弹窗',
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }}
                    >
                        modal
                    </View>


                </View>
            </View >

            <View className='open_child_box'>
                <View className='title_list'>
                    <View className='title_item' onClick={() => { setOpen(!open) }}>品牌</View>
                    <View className='title_item' onClick={() => {
                        if (!open) {
                            setOpen([1, 2, 3, 4, 5, 6, 7])
                        } else {
                            setOpen(false)
                        }
                    }}
                    >
                        距离
                    </View>
                </View>
                <View className='child_list' style={open ? { height: '200rpx' } : { height: 0, padding: 0, margin: 0 }}>
                    {open && open[0] && open.map((e, i) => {
                        return (<View key={e} className='child_item'>{e}</View>)
                    })}
                </View>
            </View>

            <View
                onClick={() => {

                    setStorageSync('cop_src', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3592591149,2523126110&fm=26&gp=0.jpg');
                    navigateTo({ url: '/subpages/img_cop/index' })
                }}
            >
                图片裁剪
            </View>

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


            <View>
                <Tabs
                    tag_list={list}
                    status={tag_id}
                    setTag_id={setTag_id}
                    onChange={change_tag}
                    height={900}
                    isRefresh
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
                    {'targ' + tag_id}

                </Tabs>
            </View>

        </View>
    )
}
export default Index