/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text, Image, MovableArea, MovableView, WebView } from '@tarojs/components';

import NavBar from '@/components/NavBar';
import Taro, { stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import './index.scss'
import './img/down.png'
import './img/up.png'
import './img/seat.png'
import './img/noseat.png'
import './img/select.png'
import './img/seatss.png'
import { lkGetSystemInfo } from '@/common/publicFunc';

function imgSrc(str) {
    return `/subpages/movie/img/${str}`
}
const Index = () => {

    const [scale, setScale] = useState(1);

    const [h, setH] = useState(0); //css容器高400px /item高 400 /row
    const windowWidth = lkGetSystemInfo().windowWidth * 2;
    const [data, setData] = useState({
        // 座位数组
        seatArr: '',
        // 已选择座位数组
        selectArr: '',
        // 是否显示弹窗
        isShow: false,
    })
    function set(key, value) {
        let _data = JSON.parse(JSON.stringify(data))
        _data[key] = value
        setData(_data);
    }

    useDidShow(() => {
        let box_hight = 800; // rpx单位
        var row = 20;
        var col = 5;
        console.log(scale / col, scale / row);
        setH(box_hight / row); // 根据每一项设置容器高度
        let scl;
        if ((scale / col) > (scale / row)) { // 行数大于列数
            scl = scale / row * (400 / 375 * (row / col) * 3.5);
        } else {
            if (col >= 40) {
                scl = scale / col * 2.5;
            } else {
                scl = scale / col * 3;
            }
        }
        setScale(scl);

        var seatArr = new Array(row); //row行
        var src = imgSrc("seat.png");
        var m = {};
        var s = 0;
        for (var i = 0; i < row; i++) {
            seatArr[i] = new Array(col);
            for (var j = 0; j < col; j++) {
                var ss = Math.ceil(Math.random() * col);
                m.num = j;
                if (ss % j == 3) {
                    m.src = imgSrc("noseat.png");
                    m.no_select = true;
                } else {
                    m.src = src
                }
                seatArr[i][j] = m;
                m = {}
            }
        }
        console.log(seatArr);
        set('seatArr', seatArr); // 生成测试数据
    })
    const hanldeClick = (row, col) => {
        let str = `${row}排${col}列`
        let copy = JSON.parse(JSON.stringify(data))
        let newArr = copy.seatArr;
        if (newArr[row][col].no_select) return;
        newArr[row][col].select = !newArr[row][col].select;
        if (newArr[row][col].select) {
            newArr[row][col].src = imgSrc("select.png");
        } else {
            newArr[row][col].src = imgSrc("seat.png");
        }
        copy.selectArr = [...copy.selectArr, { row: row + 1, col: col + 1 }]
        setData(
            {
                ...copy
            }
        )
    }


    return (
        <View className='movie_wrap'>

            <WebView src='http://172.16.5.19:3000/xmt' />
            <NavBar back title='电影选座' />
            {
                (data && data.seatArr[0] && windowWidth) && <>
                    <MovableArea className='move_square'
                        style={{ height: data.seatArr.length * h + 'rpx' }}
                    >
                        <MovableView outOfBounds className='move_view' direction='all' scaleMax={4} scale x={windowWidth / 4 - 5}>
                            {
                                data && data.seatArr[0] && data.seatArr.map((row, row_index) => { // 行
                                    return (
                                        <View className='row_item' key={row_index + '-row'} >
                                            {
                                                row[0] && row.map((col, col_index) => { // 列
                                                    return (
                                                        <View className='col_item' key={`${row_index}${col_index}${col.src}-col`}>
                                                            <View className='img_wrap' style={{ width: `${h * scale}rpx`, height: `${h * scale}rpx` }}  >
                                                                <Image src={col.src} onClick={() => hanldeClick(row_index, col_index)} mode='widthFix' style={{ width: `${h * scale}rpx` }} />
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }

                        </MovableView>
                    </MovableArea>

                    <View className='select_box'>
                        {
                            data.selectArr[0] && data.selectArr.map(e => {
                                return (
                                    <View className='item' key={e.row + e.col}>
                                        {e.row}排{e.col}列
                                    </View>
                                )
                            })
                        }
                    </View>

                </>
            }


            {/* <WebView src='http://172.16.5.17:3000#wechat_redirect' onMessage={(d) => {
                console.log(d);
            }}
            /> */}
        </View>
    )
}
export default Index;
