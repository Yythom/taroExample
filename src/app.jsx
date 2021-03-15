import { getLocal } from '@/common/publicFunc'
import { setStorageSync } from '@tarojs/taro'
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../store'
import './app.scss'

class App extends Component {

    componentDidMount() { }

    componentDidShow() {
        getLocal().then(res => {
            setStorageSync('location_address', res)
        })
    }

    componentDidHide() { }

    componentDidCatchError() { }

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
