/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/react-in-jsx-scope */
import Taro, { showLoading, hideLoading, useDidShow, getStorageSync, navigateBack } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import React, { useState } from 'react';
import TaroCropper from 'taro-cropper';
import './index.scss'

function Index() {
    const [src, setSrc] = useState('')
    const [cutImagePath, setCutImagePath] = useState('');

    useDidShow(() => {
        console.log();
        if (getStorageSync('cop_src')) {
            setSrc(getStorageSync('cop_src'));
        }
    })

    return (
        <View className='cop_wrap'>
            <TaroCropper
                height={1000}
                src={src}
                cropperWidth={400}
                cropperHeight={400}
                // ref={this.catTaroCropper}
                // themeColor='#fff'
                // hideFinishText
                maxScale={3}
                fullScreen
                onCut={res => {
                    showLoading({ title: '加载中' });
                    // Taro.previewImage({
                    //     current: 'test', // 当前显示图片的http链接
                    //     urls: [res] // 需要预览的图片http链接列表
                    // })

                    setCutImagePath(res);
                    Taro.saveImageToPhotosAlbum({
                        filePath: res,
                        success() {
                            hideLoading();
                            Taro.showToast({
                                title: '保存成功!'
                            })
                        },
                        fail() {
                            hideLoading();
                            Taro.showToast({
                                title: '保存失败!',
                                icon: 'none',
                                duration: 2000
                            })
                        },
                    })
                }}
                hideCancelText={false}
                onCancel={() => {
                    navigateBack();
                }}
            />
            {/* <Image
                src={cutImagePath}
                mode='widthFix'
                style={{
                    width: Taro.pxTransform(400),
                    height: Taro.pxTransform(400)
                }}
            /> */}
        </View>
    )
}

export default Index