/* eslint-disable react/jsx-indent-props */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Swiper, SwiperItem } from '@tarojs/components';

// eslint-disable-next-line no-unused-vars
import Taro, { createSelectorQuery } from '@tarojs/taro'
import './styles/tabs.scss'

const Index = (props) => {
    const {
        onChange,
        list, // list=[{title,content}]  content=>swiper所需要的列表内容 Array
        content_list, // swiper-item typeof Array
        scrollToLowerFn, // swiper到底触发事件
        refresh_status, // 刷新状态
        refresh_handle, // 刷新事件函数
        setRefresh_status, // 设置刷新状态
        parentClass, // 是 并且不能为 nav
        childrenClass, // 是 并且不能为 nav-item-act nav-item nav-item 
    } = props;

    const query = createSelectorQuery();
    const [swiperIndex, setSwiperIndex] = useState(''); // tab index
    const [navInfos, setNavInfos] = useState([]);  // 所有子元素的信息
    const [navItemWidth, setNavItemWidth] = useState([]);  // 选中下划线的宽度
    const [navItemLeft, setNavItemLeft] = useState([]);   // 选中下划线的显示位置
    const [parentLeft, setParentLeft] = useState([]);   // 选中下划线的显示位置
    const [componentWidth, setComponentWidth] = useState([]);   // 选中下划线的显示位置
    const [scrollLeft, setScrollLeft] = useState('');   // tab scrollLeft:number

    function init() {
        console.log('获取元素');
        setTimeout(() => {
            query.select(`.${parentClass}`).fields({ rect: true, size: true }, res => {
                if (res) {
                    setParentLeft(res.left);
                    setComponentWidth(res.width);
                    console.log('res==>', res);
                } else {
                    init();
                }
            });
            query.selectAll(`.${childrenClass}`).fields({ rect: true, size: true }, data => {
                if (list) {
                    if (data[0]) {
                        let navInfosArr = [];
                        data.forEach((item, index) => {
                            if (index == 0) {
                                setNavItemLeft(item.left);
                                setNavItemWidth(item.width);
                            }
                            navInfosArr.push({ width: item.width, left: item.left });
                        });
                        setNavInfos(navInfosArr)
                        console.log(navInfosArr, '---->>>');
                    } else {
                        init();
                    }
                }
            });
            query.exec();
        }, 100);
    }
    // swiper到底事件
    const onLower = () => {
        console.log('到底了');
        scrollToLowerFn();
    }

    // 下拉刷新事件
    const refresh = () => {
        console.log('刷新');
        setRefresh_status(true);
        refresh_handle(); // props
    }



    // 点击tab切换函数
    function taggleNav(i) {
        setSwiperIndex(i);
        scrollMoveDom(i)
    }

    // 滑动swiper切换
    function swiperChange(e) {
        let current = e.detail.current
        taggleNav(current);
        onChange(list[current].tag_id);
    }

    function scrollMoveDom(index) {
        // 滚动tabs以及移动下划线
        let info = navInfos[index];
        let offsetLeft = info.left - parentLeft;
        let scrollLefts = offsetLeft - (componentWidth - info.width) / 2;
        let scrollToLeft = scrollLefts < 0 ? 0 : scrollLefts;
        setScrollLeft(scrollToLeft);
        setNavItemLeft(info.left)
        setTimeout(() => {
            setNavItemWidth(info.width)
        }, 50);
    }

    useEffect(() => {
        if (list) {
            init();
        }
    }, [])


    return (
        <View className='tab-wrap'>
            <View>
                <ScrollView className='nav-scroll' enableFlex scrollWithAnimation scrollX scrollLeft={scrollLeft}>
                    <View className={`nav ${parentClass}`} >
                        {
                            list && list.map((item, index) => {
                                return (
                                    <View key={item} className={swiperIndex == index ? 'nav-item-act nav-item ' + childrenClass : 'nav-item ' + childrenClass} onClick={() => taggleNav(index)}>
                                        {item.title}
                                    </View>
                                )
                            })
                        }
                        <View className='nav-line' style={{ width: navItemWidth + 'px', left: navItemLeft + 'px' }} ></View>
                    </View>
                </ScrollView>
                {content_list[0]
                    &&
                    <View className='swiper'>
                        <Swiper current={swiperIndex} duration={300} className='swiper_ex' easingFunction='linear' onChange={swiperChange}>
                            {
                                list && list.map((item, index) => {
                                    return <SwiperItem key={index}>
                                        <ScrollView
                                            className='swiper-scroll'
                                            scrollY
                                            lowerThreshold={80}
                                            refresherTriggered={refresh_status}
                                            onRefresherRefresh={refresh}
                                            onScrollToLower={onLower}
                                            refresherEnabled
                                        >
                                            <View>
                                                {
                                                    content_list && content_list.map((e, i) => {
                                                        return <View className='swiper-item-list' key={e} >{typeof e === 'string' && e} -- index：{i}</View>
                                                    })
                                                }

                                            </View>
                                        </ScrollView>
                                    </SwiperItem>
                                })
                            }

                        </Swiper>
                    </View>
                }



            </View >
        </View >
    )
}
export default Index;
