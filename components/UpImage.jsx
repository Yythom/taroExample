/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-unused-vars */
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import React, { Component, useEffect, useState } from 'react';
import Taro, { getStorageSync, useDidShow } from '@tarojs/taro';
import { View, Canvas, Button, Image } from '@tarojs/components';

import './styles/img.scss';

function Index(props) {
    const {
        btn_text, // 按钮文案
        canvas_style,
        isShrink, // 是否开启压缩
    } = props;

    const [img, setImage] = useState(false);

    function up_file(path) {
        Taro.uploadFile({
            url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
            filePath: path,
            name: 'file',
            formData: {
                'user': 'test'
            },
            // eslint-disable-next-line no-shadow
            success(res) {
                console.log(res);
            }
        })
    }

    const selectImg = async () => {
        //压缩图片
        Taro.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                if (!isShrink) {
                    console.log('选择图片=>', res.tempFilePaths[0])
                    up_file(res.tempFilePaths[0]);
                } else return
                Taro.getImageInfo({
                    src: res.tempFilePaths[0],
                    // eslint-disable-next-line no-shadow
                    success: (res) => {
                        console.log('getImageInfo=>res', res)
                        console.log('getImageInfo=>', res.path)
                        let originW = res.width
                        let originH = res.height
                        //压缩比例
                        //最大尺寸限制，这里我不知道为什么规定的320和420无法压缩到对应的值，只好/3试试，发现可以
                        let maxW = 320 / 3
                        let maxH = 420 / 3
                        //目标尺寸
                        let targetW = originW
                        let targetH = originH
                        if (originW > maxW || originH > maxH) {
                            if (originW / originH > maxW / maxH) {
                                // 要求宽度*(原生图片比例)=新图片尺寸
                                targetW = maxW;
                                targetH = Math.round(maxW * (originH / originW));
                            } else {
                                targetH = maxH;
                                targetW = Math.round(maxH * (originW / originH));
                            }
                        }
                        //尝试压缩文件，创建 canvas
                        let ctx = Taro.createCanvasContext('firstCanvas');
                        ctx.clearRect(0, 0, targetW, targetH);
                        console.log(res.path, targetW, targetH)
                        ctx.drawImage(res.path, 0, 0, targetW, targetH);
                        ctx.draw();
                        //设置canvas的长宽
                        getCanvas(targetW, targetH);

                        // eslint-disable-next-line no-shadow
                        function getCanvas(targetW, targetH) {
                            setTimeout(() => {
                                Taro.canvasToTempFilePath({
                                    canvasId: 'firstCanvas',
                                    width: targetW,
                                    height: targetH,
                                    // eslint-disable-next-line no-shadow
                                    success: (res) => {
                                        Taro.getImageInfo({
                                            src: res.tempFilePath,
                                            // eslint-disable-next-line no-shadow
                                            success: (res) => {
                                                console.log('压缩后的res', res);
                                                setImage(res.path);
                                                up_file(res.path)
                                            }
                                        })
                                    }
                                })
                            }, 500)
                        }

                    }
                })
            }
        })

    }

    useEffect(() => {


        // dispatch(actions.changeuserInfoActionAsync())
    }, [])

    return (
        <View className='up_img_wrap' >
            {img && <Image className='img' src={img} alt='loading' mode='widthFix' ></Image>}
            <View className='hiddenCanvas' style={canvas_style || { position: 'fixed', top: '-99999px' }}>
                <Canvas className='canvas' canvasId='firstCanvas' />
            </View>
            <Button onClick={selectImg}>{btn_text || '按钮：'}</Button>
        </View>
    )
}
export default Index