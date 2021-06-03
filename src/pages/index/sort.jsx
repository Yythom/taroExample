/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { MovableArea, MovableView, ScrollView, View } from '@tarojs/components';
import './temp.scss'
import SortImage from './imgSort/sortImg'
import { getStorageSync } from '@tarojs/taro';

const Sort = () => {
    const [pageData, setPageData] = useState([
        " 1 ",
        " 2 ",
        " 3 ",
        " 4 ",
    ]);
    const [pageInfo, setPageInfo] = useState(
        {
            rowHeight: 47,
            scrollHeight: '100%',
            startIndex: null,
            scrollY: true,
            readyPlaceIndex: null,
            startY: 0,
            selectedIndex: null,
        }
    )
    const [movableViewInfo, setMovableViewInfo] = useState({
        y: 0,
        showClass: 'none',
        data: 'moren'
    })

    function dragStart(event, i) {
        var startIndex = i
        console.log('获取到的元素为', pageData[startIndex])
        // 初始化页面数据
        var _pageInfo = JSON.parse(JSON.stringify(pageInfo))
        _pageInfo.startY = event.touches[0].clientY
        _pageInfo.readyPlaceIndex = startIndex
        _pageInfo.selectedIndex = startIndex
        _pageInfo.scrollY = false
        _pageInfo.startIndex = startIndex


        // 初始化拖动控件数据
        var _movableViewInfo = JSON.parse(JSON.stringify(movableViewInfo))
        _movableViewInfo.data = pageData[i]
        _movableViewInfo.showClass = "inline"
        _movableViewInfo.y = _pageInfo.startY - (_pageInfo.rowHeight / 2) - getStorageSync('navHeight')

        setPageInfo(_pageInfo);
        setMovableViewInfo(_movableViewInfo)
    }


    function dragMove(event) {
        var optionList = JSON.parse(JSON.stringify(pageData))
        var _pageInfo = JSON.parse(JSON.stringify(pageInfo))
        // 计算拖拽距离
        var _movableViewInfo = JSON.parse(JSON.stringify(movableViewInfo))
        var movedDistance = event.touches[0].clientY - _pageInfo.startY
        _movableViewInfo.y = _pageInfo.startY - (_pageInfo.rowHeight / 2) + movedDistance - getStorageSync('navHeight')
        console.log('移动的距离为', movedDistance)

        // 修改预计放置位置
        var movedIndex = parseInt(movedDistance / _pageInfo.rowHeight)
        var readyPlaceIndex = _pageInfo.startIndex + movedIndex
        if (readyPlaceIndex < 0) {
            readyPlaceIndex = 0
        }
        else if (readyPlaceIndex >= optionList.length) {
            readyPlaceIndex = optionList.length - 1
        }

        if (readyPlaceIndex != _pageInfo.selectedIndex) {
            var selectedData = optionList[_pageInfo.selectedIndex]
            optionList.splice(_pageInfo.selectedIndex, 1)
            optionList.splice(readyPlaceIndex, 0, selectedData)
            _pageInfo.selectedIndex = readyPlaceIndex
        }
        // 移动movableView
        _pageInfo.readyPlaceIndex = readyPlaceIndex
        // console.log('移动到了索引', readyPlaceIndex, '选项为', optionList[readyPlaceIndex])

        setPageInfo(_pageInfo);
        setMovableViewInfo(_movableViewInfo)
        setPageData(optionList)
    }
    function dragEnd() {
        // 重置页面数据
        var _pageInfo = JSON.parse(JSON.stringify(pageInfo))
        _pageInfo.readyPlaceIndex = null
        _pageInfo.startY = null
        _pageInfo.selectedIndex = null
        _pageInfo.startIndex = null
        _pageInfo.scrollY = true
        // 隐藏movableView
        var _movableViewInfo = JSON.parse(JSON.stringify(movableViewInfo))
        _movableViewInfo.showClass = 'none'
        setPageInfo(_pageInfo);
        setMovableViewInfo(_movableViewInfo)
    }

    return (
        <View className='sort_wrap'>
            <View className='zhuti'>
                <View className='row title-row' style={{ height: pageInfo.rowHeight + 'px' }} >
                    <View className='col1'>信息</View>
                    <View className='col2'>详情</View>
                    <View className='col3'>排序</View>
                </View>

                <MovableArea className='movable-area'
                    style={{ display: movableViewInfo.showClass, height: pageInfo.scrollHeight }}
                >
                    <MovableView
                        className='row list-row movable-row'
                        out-of-bounds='true'
                        damping='999'
                        style={{ height: pageInfo.rowHeight + 'px' }}
                        direction='vertical'
                        y={movableViewInfo.y}
                    >
                        <View className='col1 content'>{movableViewInfo.data}</View>
                    </MovableView>
                </MovableArea>

                <ScrollView
                    scrollY={pageInfo.scrollY}
                    style={{ height: pageInfo.scrollHeight }}
                >

                    <View className='list_wrap'>
                        {
                            pageData.map((e, i) => {
                                return (
                                    <View
                                        key={e}
                                        className={`row list-row ${pageInfo.readyPlaceIndex == i ? " ready-place" : ""}`}
                                        style={{ height: pageInfo.rowHeight + 'px' }}
                                        onTouchStart={(eve) => dragStart(eve, i)}
                                        onTouchMove={dragMove}
                                        onTouchEnd={dragEnd}
                                    >
                                        <View className='col1 content' >{e}</View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            <SortImage />

        </View>
    )
}
export default Sort;


