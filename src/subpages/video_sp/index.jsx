/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text, Video, Swiper, SwiperItem, Button, Image, Progress } from '@tarojs/components';

import NavBar from '@/components/NavBar';
// import NavBar from '../../wx_components/wxml-to-canvas/src/index';
import Taro, { createVideoContext, getCurrentInstance, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import './index.scss'


const Index = () => {
    const [list, setList] = useState([]);

    useDidShow(() => {
        let _list = [
            {
                src: 'https://stream7.iqilu.com/10339/article/202002/18/2fca1c77730e54c7b500573c2437003f.mp4',
                title: 'title---1'
            }, {
                src: 'https://stream7.iqilu.com/10339/article/202002/17/4417a27b1a656f4779eaa005ecd1a1a0.mp4',
                title: 'title---1'
            }, {
                src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/17/20200217101826WjyFCbUXQ2.mp4',
                title: 'title---1'
            },
        ];

        setList(_list);
        play(0);
    })

    const [act, setAct] = useState(0);
    const [ex, setEX] = useState(0); // 实例

    function play(index) {
        let videoContext = createVideoContext("myvideo" + index + "")
        setTimeout(() => {
            videoContext.play();
        }, 300);
        setAct(index);
        setEX(videoContext);
    }
    const [play_status, setPlay] = useState(false)
    const [load, setLoad] = useState(false)

    return (
        <View className='video_sp_wrap'>
            <NavBar back background='transparent' title='发现' />
            <Swiper
                class='swiper'
                vertical='true'
                onChange={(e) => {
                    let index = e.detail.current
                    play(index);
                }}
            >
                {
                    list[0] && list.map((e, i) => {
                        return (
                            <SwiperItem key={e.src}>
                                <View class='video-wrap' onClick={() => {
                                    console.log(ex);
                                    if (play_status) {
                                        ex.pause();
                                    } else { ex.play(); }
                                }}>
                                    {
                                        i == act
                                            ?
                                            <Video
                                                id={`myvideo${i}`}
                                                className='video guodu'
                                                loop
                                                src={e.src}
                                                showCenterPlayBtn={false} // 是否显示视频中间的播放按钮
                                                showFullscreenBtn={false} // 全屏按钮
                                                showPlayBtn={false} // 是否显示视频底部控制栏的播放按钮
                                                // controls={false}  // 播放控件
                                                onPause={() => {
                                                    console.log('pause');
                                                    setPlay(false)
                                                }}
                                                onPlay={() => {
                                                    console.log('play');
                                                    setPlay(true)
                                                }}
                                                onProgress={(l) => {
                                                    // console.log(l.detail.buffered);
                                                }}
                                            />
                                            : (i == act + 1 || i == act - 1)
                                            && <View className='video' style={{ background: '#000' }}>
                                                <Image mode='widthFix' src='https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg' />
                                            </View>

                                    }
                                    <View className='handle_box'>
                                        <View className='item'>
                                            <Button className='btn' onClick={() => {

                                            }}
                                            >
                                                <Text className='iconfont icon-huiyuan'></Text>
                                            </Button>
                                            <View className='text'>123</View>
                                        </View>
                                        <View className='item'>
                                            <Button openType='share' className='btn'>
                                                <Text className='iconfont icon-huiyuan'></Text>
                                            </Button>
                                            <View className='text'>123</View>
                                        </View>
                                    </View>

                                    {/* <!-- 这块用来写标题头像什么的 用 cover-view  cover-等等 --> */}
                                    <View className='title'>
                                        <View className='name'>@某某某</View>
                                        <View className='content'>
                                            这块用来写标题头像什么的这块用来写标题头像什这块用来写标题头像什这块用来写标题头像什这块用来写标题头像什
                                        </View>
                                    </View>

                                    {/* <Progress className='progress' active percent={80} strokeWidth={20} activeColor='blue' /> */}
                                </View>

                            </SwiperItem>
                        )
                    })
                }
            </Swiper>
        </View>
    )
}
export default Index;
