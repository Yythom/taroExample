/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import Taro, { getImageInfo } from '@tarojs/taro';
import { View, Image, } from '@tarojs/components';


import './styles/blur_img.scss';

function Index(props) {
    const {
        src,
        class_wrap,
    } = props;

    const [w, setW] = useState(false);
    const [h, setH] = useState(false);
    const [load, setLoad] = useState(false)


    useEffect(() => {
        console.log(src);
        setTimeout(() => {
            getImageInfo({
                src,
                // eslint-disable-next-line no-shadow
                success: (res) => {
                    console.log('图片信息', res);
                    setW(res.width);
                    setH(res.height);
                }
            })
        }, 400);
    }, [src])

    return (
        <View className={`blur_wrap ${class_wrap}`} >
            <Image
                className={load ? 'image_mohu' : 'image_mohu image--not-loaded'}
                src={src}
                onLoad={() => { setLoad(true) }}
                mode='aspectFill'
            />
        </View>
    )
}
export default Index