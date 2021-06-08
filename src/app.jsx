import { getLocal, systemInfo } from '@/common/publicFunc'
import { View } from '@tarojs/components'
import Taro, { setStorageSync } from '@tarojs/taro'
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { initErrorNet } from '../utils/wx-net_error'
import { init, breadcrumb } from '../utils/wx'

import store from '../store'
import './app.scss'

class App extends Component {

    componentWillMount() {

    }
    componentDidMount() {
        init({ // 不可在异步执行
            silentConsole: false,
            // debug: true,
            maxBreadcrumbs: 30
        });
        initErrorNet(breadcrumb);
    }
    componentDidShow() {

        // getLocal().then(res => { // 获取当前位置
        //     setStorageSync('location_address', res)
        // })
    }

    componentDidHide() { }


    // this.props.children 是将要会渲染的页面
    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        )
    }
}

export default App
