import { useSelector, shallowEqual } from 'react-redux';
import React, { useLayoutEffect, useState } from 'react';
import Taro, { getStorageSync, useDidShow } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import Config from './theme.json'

import './index.scss';

function Index() {
    const userStore = useSelector(e => e.userStore, shallowEqual);
    const [option, setOption] = useState({
        grid:
        {
            "bottom": "3%",
            "containLabel": true,
            // "left": "3%", "right": "4%"
        },
        series:
            [
                {
                    data: [120, 132, 101, 134, 90, 230, 210],
                    name: "订单数",
                    stack: "总量",
                    type: "line"
                },
            ],
        // title: { "text": "折线图堆叠" },
        tooltip: {
            trigger: "axis",
            formatter: '日期：{b0}号， 订单数：{c0}单'

        },
        xAxis: {
            // "boundaryGap": false,
            "data": ["1", "2", "3", "4", "5", "6", "7"],
            "type": "category"
        },
        yAxis: { "type": "value" }
    })



    useDidShow(() => {
        console.log(userStore);

    })

    const onInstance = (E) => {
        // console.log(E.detail);
        // e.registerTheme('vintage', {
        //     color: colors,
        //     backgroundColor: '#fef8ef',
        //     graph: {
        //       color: colors,
        //     },
        //   });
    }

    return (
        <View className='index-wrap' >
            <chart chart-class="chart" option={option} theme={Config.theme} onInstance={onInstance} />
            <View className=''
                onClick={() => {
                }}></View>


        </View>
    )
}
export default Index;