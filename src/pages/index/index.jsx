import { useSelector, shallowEqual } from 'react-redux';
import React, { useState } from 'react';
import Taro, { getStorageSync, useDidShow } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar'
import Modal from '@/components/modal/Modal';
import './index.scss';

function Index() {
    const userStore = useSelector(e => e.userStore, shallowEqual);


    useDidShow(() => {
        console.log(userStore);
    })

    const [modal, setModal] = useState(false);
    return (
        <View className='index-wrap' >
            <NavBar background='pink' title='首页' />
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <Button onClick={() => setModal(!modal)}>modal</Button>
                <Modal show={modal} setShow={setModal} />

            </View >
        </View>
    )
}
export default Index