import { getLocal, systemInfo } from '@/common/publicFunc'
import Taro, { setStorageSync } from '@tarojs/taro'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { init } from '../utils/wx-mini'
import store from '../store'
import './app.scss'

class App extends Component {

    componentDidMount() { }

    componentDidShow() {
        init({
            silentConsole: false,
            silentFetch: true,
            silentXhr: true,
            // debug: true,
            silentVue: true,
            maxBreadcrumbs: 50
        });
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
