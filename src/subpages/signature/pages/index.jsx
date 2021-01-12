import Taro, { useDidShow } from '@tarojs/taro';
import { View, Button, Canvas } from '@tarojs/components';
import React, { useState } from 'react';
import './index.scss'

let startX = 0;
let startY = 0;
let canvasw = 0;
let canvash = 0;
function Signature() {
    const [isPaint, setIsPaint] = useState(false);
    const [tempFilePath, setTempFilePath] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    let ctx = Taro.createCanvasContext('canvas');



    function init() {
        const d = Taro.getSystemInfoSync()
        const w = d.windowWidth * 0.9
        const h = (w / 0.75).toFixed(2);
        console.log(h);
        initCanvas(w, h)
        setWidth(w);
        setHeight(h);
    }

    function initCanvas(w, h) {
        ctx = Taro.createCanvasContext('canvas');
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, w, h);
        console.log(w, h);
        ctx.save();
        ctx.setStrokeStyle('#000000');
        ctx.setLineWidth(10);
        ctx.setLineCap('round');
        ctx.setLineJoin('round');
        ctx.draw()
    }
    function canvasStart(e) {
        startX = e.changedTouches[0].x
        startY = e.changedTouches[0].y
        ctx.beginPath();
    }
    function canvasMove(e) {
        if (startX != 0) {
            setIsPaint(true);
        }
        let x = e.changedTouches[0].x
        let y = e.changedTouches[0].y
        ctx.moveTo(startX, startY)
        ctx.lineTo(x, y)
        ctx.stroke();
        ctx.draw(true)
        startX = x
        startY = y
    }
    function canvasEnd(e) {
        console.log('结束')
    }
    // 取消
    function clearDraw() {
        console.log('清楚', width);
        startX = 0;
        startY = 0;
        ctx.clearRect(0, 0, canvasw, canvash);
        ctx.draw();
        init();
        setIsPaint(false);
        setTempFilePath('');
    }

    function createImg() {
        if (!isPaint) {
            Taro.showToast({
                title: '签名内容不能为空！',
                icon: 'none'
            });
            return false;
        };
        // 生成图片 
        Taro.canvasToTempFilePath({
            canvasId: 'canvas',
            success: res => {
                console.log(res.tempFilePath);
                setTempFilePath(res.tempFilePath);
                // 把图片保存到系统中

                Taro.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
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


                // this.uploadToAliyun(res.tempFilePath)
            },
            fail(err) {
                console.log(err)
            }
        })
    }

    useDidShow(() => {
        ctx = null;
        init();
    });

    return (
        <View className='signature'>
            <View className='canvas-box'>
                <Canvas
                    canvasId='canvas'
                    className='canvas'
                    disableScroll={true}
                    onTouchStart={canvasStart}
                    onTouchMove={canvasMove}
                    onTouchEnd={canvasEnd}
                    onTouchCancel={canvasEnd}
                    style={{ width: `${width}px`, height: `${height}px` }}>
                </Canvas>
            </View>


            <View className=' buttons'>
                <Button className='confirm' onClick={() => createImg()}>提交</Button>
                <Button className='cancel' onClick={clearDraw}>清除</Button>
            </View>
        </View>

    );
}
export default Signature

