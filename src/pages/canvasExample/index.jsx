/* eslint-disable no-shadow */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Text, Canvas, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

function Index() {
    const [imageUrl, setUrl] = useState('');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [saveImage, setImage] = useState('');

    function init() {
        const d = Taro.getSystemInfoSync()
        const w = d.windowWidth * 0.85
        const h = (w / 0.75).toFixed(2)
        const rate = (d.windowWidth / 375).toFixed(2);
        setWidth(w);
        setHeight(h);
        let imageAry = ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3849299870,82529265&fm=26&gp=0.jpg']
        // 获取所有的网络图片
        Promise.all(
            imageAry.map(img => processMultipleImages(img))
        ).then(images => {
            const imgAll = images.map(i => i.path);
            if (imgAll.length > 0) {
                drawContent(w, h, rate, imgAll)
            }
            setUrl(imgAll)
        }).catch((err) => {
            console.log(err);

        })
    }

    // 获取基本信息
    Taro.useDidShow(() => {
        init();
    })

    // useEffect(() => {
    //   if (imageUrl.length > 0) {
    //     drawContent()
    //   }
    // }, [imageUrl])

    // 画主体内容
    const drawContent = (width, height, rate, imageUrl) => {

        // 空心圆
        const drawEmptyCircle = (ctx, x, y, r, lineWidth, color) => {
            ctx.beginPath();
            ctx.arc(x * rate, y * rate, r * rate, 0, 2 * Math.PI)
            ctx.lineWidth = lineWidth * rate
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();
        }
        // 实心圆
        const drawFillCircle = (ctx, x, y, r, w) => {
            ctx.beginPath()
            ctx.arc(x * rate, y * rate, r * rate, 0, 2 * Math.PI)
            ctx.fillStyle = "#FFE04A";
            ctx.fill()
            ctx.closePath()
        }


        console.log(width, height, rate);

        const ctx = Taro.createCanvasContext('shareuser');
        const cx = 5 * rate + 20 * rate
        const cy = 12 * rate + 20 * rate
        // // 背景颜色
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, width, height)
        ctx.save()
        drawLine(ctx, 4, 100, 100, 399, 100)
        ctx.rect(10, 10, 150, 75)
        ctx.setFillStyle('red')
        ctx.fill();
        drawText(ctx, '#1D1E1F', '来自xxx 的分享', 66 * rate, 24 * rate, 12)
        ctx.save()



        // // 头像
        // ctx.beginPath()
        // ctx.arc(cx, cy, 20 * rate, 0, 2 * Math.PI)
        // ctx.clip()
        // ctx.drawImage(imageUrl[0], 6 * rate, 12 * rate, 40 * rate, 40 * rate)
        // ctx.restore()

        // drawText(ctx, '#1D1E1F', '来自xxx 的脱单团', 66 * rate, 24 * rate, 12)
        // ctx.save()
        // // 画外圆
        // ctx.beginPath()
        // ctx.arc(56 * rate, 140 * rate, 80 * rate, 0, 2 * Math.PI)
        // ctx.lineWidth = 16 * rate
        // ctx.clip()
        // ctx.strokeStyle = "#FFE04A";
        // ctx.stroke()
        // ctx.closePath()
        // // 画内圆 并 填充头像
        // ctx.beginPath()
        // const x = 56 * rate
        // const y = 74 * rate + 64 * rate
        // ctx.arc(x, y, 64 * rate, 0, 2 * Math.PI)
        // ctx.clip()
        // ctx.drawImage(imageUrl[0], 0 * rate, 74 * rate, 128 * rate, 128 * rate)
        // ctx.closePath()

        // ctx.restore()

        // 绘制圆圈装饰


        drawEmptyCircle(ctx, 250, 47, 18, 4, "#FFE04A");

        drawFillCircle(ctx, 238, 83, 9);
        drawFillCircle(ctx, 220, 106, 8);
        drawFillCircle(ctx, 200, 140, 8);

        // ctx.restore()

        // const size14 = 14 * rate
        // // 绘制二维码
        // // ctx.drawImage(imageUrl[1], 210 * rate, 120 * rate, 86 * rate, 86 * rate)
        // // drawText(ctx, '#1D1E1F', '扫码认识Ta', 216 * rate, 220 * rate, size14)

        // // // 绘制个人基本信息
        // ctx.beginPath()
        // const margin56 = 56 * rate
        // drawText(ctx, '#1D1E1F', '某个用户的昵称', size14, 270 * rate, 20 * rate)
        // drawText(ctx, '#1D1E1F', '资料', size14, 300 * rate, size14)
        // drawText(ctx, '#1D1E1F', '这是个人信息|什么|换行', margin56 * rate, 300 * rate, size14)
        // drawText(ctx, '#1D1E1F', '兴趣', size14, 336 * rate, size14)
        // drawText(ctx, '#1D1E1F', '唱歌、篮球、rap...', margin56 * rate, 336 * rate, size14)
        // drawText(ctx, '#1D1E1F', '简介', size14, 372 * rate, size14)
        // drawText(ctx, '#1D1E1F', '这是一段很长的简介...', margin56 * rate, 372 * rate, size14)


        ctx.draw();
        setTimeout(() => {
            Taro.canvasToTempFilePath({
                x: 0,
                y: 0,
                width,
                height,
                canvasId: 'shareuser',
                success: (result) => {
                    setImage(result.tempFilePath)
                },
                fail: (err) => {
                    Taro.showToast('图片生成失败！')
                }
            })
        }, 600)
    }

    // 处理多张网络图片
    const processMultipleImages = (url) => {
        return new Promise((resolve, reject) => {
            Taro.getImageInfo({
                src: url,
                success: (res) => {
                    resolve(res)
                },
                fail: (err) => {
                    console.log(err);

                    Taro.showToast({
                        title: '生成失败!',
                        icon: 'none'
                    })
                }
            })
        })
    }

    // 绘制实心圆

    // 绘制空心圆 


    // 绘制直线
    const drawLine = (ctx, w, pointX, pointY, endX, endY) => {
        //设置直线的宽
        ctx.setLineWidth(w);
        //设置直线的起点
        ctx.lineTo(pointX, pointY)
        //设置直线的终点
        ctx.lineTo(endX, endY)
        //设置描边，记住画直线一定要设置描边，否则没有图像
        ctx.stroke();
        ctx.closePath();
    }

    // 绘制文本
    const drawText = (ctx, color, text, x, y, font = 16) => {
        ctx.setFontSize(font)
        ctx.setFillStyle(color)
        ctx.setTextAlign('left')
        ctx.fillText(text, x, y)
        ctx.stroke()
        ctx.closePath()
    }

    // 保存到相册
    const onClickSaveImage = () => {
        Taro.getSetting({
            success(res) {
                // 如果没有授权过，则要获取授权
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    Taro.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            savePictureSystem()
                        },
                        fail() { // 用户拒绝
                            Taro.showModal({
                                title: '授权',
                                content: '您拒绝了授权请求，是否要手动开启？',
                                success: function (res) {
                                    if (res.confirm) {
                                        Taro.openSetting({
                                            success: function (res) {
                                                console.log(res.authSetting)
                                                res.authSetting = {
                                                    "scope.userInfo": true,
                                                    "scope.userLocation": true
                                                }
                                            }
                                        })
                                    } else if (res.cancel) {
                                        Taro.showToast({
                                            title: '保存失败！',
                                            icon: 'close',
                                            duration: 2000
                                        })
                                    }
                                }
                            })
                        }
                    })
                } else { // 如果已经授权过，可以直接保存
                    savePictureSystem()
                }
            }
        })
    }

    // 把图片保存到系统中
    const savePictureSystem = () => {
        console.log(saveImage);

        Taro.saveImageToPhotosAlbum({
            filePath: saveImage,
            success(res) {
                Taro.showToast({
                    title: '保存成功!'
                })
            },
            fail() {
                Taro.showToast({
                    title: '保存失败!',
                    icon: 'close',
                    duration: 2000
                })
            }
        })
    }

    return (
        <View className='share-user-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Canvas style={{ width: `${width}px`, height: `${height}px` }} canvasId='shareuser' id='shareuser' className='canvas-wrapper'></Canvas>
            <Button onClick={onClickSaveImage}>保存到相册</Button>

        </View>
    )

}
export default Index