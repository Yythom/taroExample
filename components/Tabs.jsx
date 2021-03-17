/* eslint-disable react/jsx-indent-props */
import React, { useState, useEffect, memo } from 'react';
import { View, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import Taro, { createSelectorQuery, getStorageSync } from '@tarojs/taro'
import { debounce } from '@/common/utils';
import './styles/tabs.scss'
import Sticky from './Sticky';

const Index = (props) => {
    const {
        onChange,
        tag_list, // list=[{title,tag_id}]  分类列表
        status,
        className,
        height,
        isSticy, // 是否头部置顶
        scrollToLowerFn, // swiper到底触发事件
        refresh_status, // 刷新状态
        refresh_handle, // 刷新事件函数
        setRefresh_status, // 设置刷新状态
        parentClass, // 是 并且不能为 nav
        childrenClass, // 是 并且不能为 nav-item-act nav-item nav-item 
        isRefresh,
        renderCenter, // 筛选
        topClass, // 吸顶
        notChildScroll, // 是否需要开启scroll—view
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
                } else {
                    init();
                }
            });
            query.exec();
        }, 100);
    }
    // swiper到底事件
    const onLower = debounce(() => {
        console.log('到底了');
        scrollToLowerFn();
    }, 600)

    // 下拉刷新事件
    const refresh = () => {
        if (refresh_status) return
        console.log('刷新');
        setRefresh_status(true);
        refresh_handle(); // props
    }



    // 点击tab切换函数
    function taggleNav(i) {
        setSwiperIndex(i);
        scrollMoveDom(i);
    }

    // 滑动swiper切换
    function swiperChange(e) {
        let current = e.detail.current;
        taggleNav(current);
        onChange(tag_list[current].status);
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
        if (tag_list[0]) {
            init();
            console.log(props.children);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tag_list]);

    useEffect(() => {
        if (navInfos[0]) {
            let i = tag_list.findIndex(v => v.status == status);
            if (i !== -1) {
                taggleNav(i);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, navInfos[0]])

    return (
        <>
            {
                (tag_list[0] || props.children)
                && <View className={`tab-wrap  ${className}`}>
                    <View>
                        <View className={isSticy ? topClass + ' sticy' : topClass}
                            style={isSticy && { top: getStorageSync('navHeight') + 'px', zIndex: 999 }}
                        >
                            {
                                tag_list[0]
                                &&
                                <ScrollView className='nav-scroll' enableFlex scrollWithAnimation scrollX scrollLeft={scrollLeft}>
                                    <View className={`nav ${parentClass}`} >
                                        {
                                            tag_list && tag_list.map((item, index) => {
                                                return (
                                                    <View key={item} className={swiperIndex == index ? 'nav-item-act nav-item ' + childrenClass : 'nav-item ' + childrenClass} onClick={() => { typeof item.show === 'boolean' ? (item.show ? taggleNav(index) : '') : taggleNav(index) }}>
                                                        {item.title}
                                                    </View>
                                                )
                                            })
                                        }
                                        <View className='nav-line' style={{ width: navItemWidth + 'px', left: navItemLeft - 1 + 'px' }} ></View>
                                    </View>

                                </ScrollView>
                            }
                            {
                                renderCenter
                                && <View className='tab_center'>
                                    {renderCenter}
                                </View>
                            }
                        </View>
                        {
                            props.children
                            &&
                            <View className='swiper' style={{ height: height }}>
                                <Swiper
                                    current={swiperIndex}
                                    duration={300}
                                    className='swiper_ex'
                                    easingFunction='linear'
                                    onChange={swiperChange}
                                    circular
                                >
                                    {
                                        tag_list
                                        && tag_list[0]
                                        && tag_list.map((item, index) => {
                                            return (
                                                typeof item.show === 'boolean' // 是否开启下一个swiper
                                                    ? (
                                                        item.show && <SwiperItem key={index} className='swiper_item'>
                                                            {
                                                                !notChildScroll ? <ScrollView
                                                                    className='swiper-scroll'
                                                                    scrollY
                                                                    lowerThreshold={80}
                                                                    refresherTriggered={refresh_status}
                                                                    onRefresherRefresh={refresh}
                                                                    onScrollToLower={onLower}
                                                                    refresherEnabled={isRefresh}
                                                                >
                                                                    <View>
                                                                        {/* {props.children} */}
                                                                        {item.status == status ? props.children : null}
                                                                    </View>
                                                                </ScrollView> : <View className='swiper-scroll'>
                                                                    <View>
                                                                        {/* {props.children} */}
                                                                        {item.status == status ? props.children : null}
                                                                    </View>
                                                                </View>
                                                            }
                                                        </SwiperItem>
                                                    )
                                                    : <SwiperItem key={index} className='swiper_item'>
                                                        {
                                                            !notChildScroll ? <ScrollView
                                                                className='swiper-scroll'
                                                                scrollY
                                                                lowerThreshold={80}
                                                                refresherTriggered={refresh_status}
                                                                onRefresherRefresh={refresh}
                                                                onScrollToLower={onLower}
                                                                refresherEnabled={isRefresh}
                                                            >
                                                                <View>
                                                                    {/* {props.children} */}
                                                                    {item.status == status ? props.children : null}
                                                                </View>
                                                            </ScrollView> : <View className='swiper-scroll'>
                                                                <View>
                                                                    {/* {props.children} */}
                                                                    {item.status == status ? props.children : null}
                                                                </View>
                                                            </View>
                                                        }
                                                    </SwiperItem>

                                            )
                                        })
                                    }

                                </Swiper>
                            </View>
                        }
                    </View >
                </View >
            }
        </>
    )
}

export default memo(Index);
