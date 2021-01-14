/* eslint-disable react/jsx-indent-props */
import React, { useState } from "react";
import { Button, Canvas, Image, View } from "@tarojs/components";
import Taro, { showToast, useDidShow, useShareAppMessage } from "@tarojs/taro";
import dayjs from "dayjs";

import "./index.scss";


function ProductDetail() {
    return (
        <View>
            <Pre />
        </View>
    );
}

function Pre() {
    const [flag, setFlag] = useState(false);

    // const [user, setUser] = useState(null);
    const [height, setHetight] = useState(null);
    const [src, setSrc] = useState("");
    useDidShow(async () => {
        setFlag((await Taro.getSetting()).authSetting["scope.writePhotosAlbum"]);
        // 开启分享
        Taro.showShareMenu({
            withShareTicket: true,
        });
        const { params } = Taro.getCurrentInstance().router;
        console.log(params);
        let imgArr = [];
        imgArr = [
            `https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2344451607,2404623174&fm=11&gp=0.jpg`,
            `https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2410745465,4132959416&fm=26&gp=0.jpg`,
            `https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2410745465,4132959416&fm=26&gp=0.jpg`,
        ];
        init(imgArr);
    });

    const init = async (imgArr) => {
        Taro.showLoading({ title: "加载中" });
        const { windowWidth, windowHeight } = await Taro.getSystemInfo();
        const w = windowWidth;
        const h = windowHeight;
        setHetight(h);
        const wR = (windowWidth / 375).toFixed(2);
        const _w = w - wR * 40;

        Promise.all(imgArr.map((i) => processMultipleImages(i))).then((imgs) => {
            console.log(imgs);

            canvasDraw(w, _w, h, imgs);
        });
    };

    function darwRoundRect(x, y, w, h, r, ctx) {
        ctx.save()
        ctx.beginPath()

        // 左上弧线
        ctx.arc(x + r, y + r, r, 1 * Math.PI, 1.5 * Math.PI)
        // 左直线
        ctx.moveTo(x, y + r)
        ctx.lineTo(x, y + h - r)
        // 左下弧线
        ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, 1 * Math.PI)
        // 下直线
        ctx.lineTo(x + r, y + h)
        ctx.lineTo(x + w - r, y + h)
        // 右下弧线
        ctx.arc(x + w - r, y + h - r, r, 0 * Math.PI, 0.5 * Math.PI)
        // 右直线
        ctx.lineTo(x + w, y + h - r)
        ctx.lineTo(x + w, y + r)
        // 右上弧线
        ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI)
        // 上直线
        ctx.lineTo(x + w - r, y)
        ctx.lineTo(x + r, y)

        ctx.setFillStyle('#fff')
        ctx.fill();
        ctx.save();
    }

    const canvasDraw = (w1, w, h, imgs) => {
        const ctx = Taro.createCanvasContext("product");
        let cover = imgs[2].height
        const rightX = 17.5;
        const rightY = 15;
        // 背景
        ctx.rect(0, 0, w1, 710);
        ctx.setFillStyle('#F3F3F3');
        ctx.fill();
        ctx.save();

        darwRoundRect(rightX, rightY, w1 - 30, 590, 20, ctx);

        // 头像
        const avatarX = 30 + rightX;
        const avatarY = rightY + 30;
        ctx.beginPath();
        ctx.arc(avatarX, 20 + avatarY, 20, 0, 2 * Math.PI);
        ctx.setFillStyle("red");
        ctx.fill();

        ctx.clip();
        ctx.drawImage(imgs[0].path, avatarX - 20, avatarY, 40, 40); // 往回位移自身一半居中
        ctx.closePath();
        ctx.restore();
        ctx.save();

        // 用户名
        ctx.beginPath();
        ctx.setFontSize(15);
        ctx.setFillStyle("#101010");
        ctx.fillText('用户昵称', 58 + rightX, 20 + avatarY);
        ctx.save();

        // 描述
        ctx.beginPath();
        ctx.setFontSize(8);
        ctx.setFillStyle("#888686");
        ctx.fillText("邀请您使用大树精选长按识别小程序码", 58 + rightX, 35 + avatarY);
        ctx.save();

        // 小程序码
        const codeX = w1 - 46 - rightX;
        ctx.beginPath();
        ctx.arc(codeX, 48 + rightY, 36, 0, 2 * Math.PI);
        ctx.setFillStyle("red");
        ctx.fill();

        ctx.clip();
        ctx.drawImage(imgs[1].path, codeX - 36, 12 + rightY, 72, 72); // 往回位移自身一半居中
        ctx.closePath();
        ctx.restore();
        ctx.save();

        // 商品图片
        const ImgY = 92 + rightY;

        ctx.beginPath();
        ctx.rect(rightX, ImgY, w1 - 30, imgs[0].height);
        ctx.setFillStyle("#fff");
        ctx.fill();

        ctx.clip();
        ctx.drawImage(
            imgs[0].path,
            rightX,
            ImgY,
            w1 - 30,
            imgs[0].height
        );
        ctx.closePath();
        ctx.restore();
        ctx.save();

        let moveHeight = 92 + cover + 20 + 11;

        // tag [京东]
        const tagY = 92 + cover + rightY + 20
        ctx.beginPath();
        ctx.rect(
            10 + rightX,
            tagY + 18,
            10 + ctx.measureText('【标签】').width,
            15
        );
        ctx.setFillStyle("#f66666");
        ctx.fill();
        ctx.save();

        ctx.setFillStyle('#FFFFFF')
        ctx.setFontSize(10);
        ctx.fillText(
            '【标签】',
            12 + rightX,
            tagY + 29,
        );

        // 商品描述
        let text = '这是一段描述的内容 两行溢出省略号';
        drawText(
            ctx,
            w - 30,
            moveHeight,
            text,
            ctx.measureText('【标签】').width + 10,
            rightX,
            rightY + 20
        );

        // 上间距
        const tm = moveHeight + 40 + rightY + 20;

        // 折扣文字
        ctx.setFillStyle("#f66666");
        ctx.setFontSize(12);
        ctx.fillText("折后价 ¥", 10 + rightX, tm);

        // 折扣价格
        ctx.setFillStyle("#f66666");
        ctx.setFontSize(24);
        ctx.fillText('price', 60 + rightX, tm + 1);

        // 原价
        ctx.setFillStyle("#88898A");
        ctx.setFontSize(10);
        ctx.fillText(
            "原价 ¥ " + 'price2',
            120 + ctx.measureText('price').width + rightX,
            tm - 1
        );

        // 横线
        ctx.beginPath();
        ctx.setFillStyle("#88898A");
        ctx.moveTo(120 + ctx.measureText('price').width + rightX, tm - 3);
        ctx.lineTo(
            120 +
            ctx.measureText("原价 ¥ " + 'price2').width +
            ctx.measureText('price').width + rightX,
            tm - 3.5
        );
        ctx.stroke();

        // 过期时间
        ctx.setFillStyle("rgba(51,51,51,0.7)");
        ctx.setFontSize(12);
        ctx.fillText(
            // "过期时间：" + dayjs.unix(product.expire_time).format("YYYY年MM月DD日"),
            "过期时间：" + '2020-01-20',
            10 + rightX,
            tm + 20
        );

        ctx.draw();
        setTimeout(() => {
            Taro.canvasToTempFilePath({
                canvasId: "product",
                success: (res) => {
                    const { tempFilePath } = res;
                    console.log(tempFilePath);
                    setTimeout(() => {
                        Taro.hideLoading();
                    }, 300);
                    setSrc(tempFilePath);
                },
                fail: (err) => {
                    setTimeout(() => {
                        Taro.hideLoading();
                        Taro.showToast({
                            icon: "none",
                            title: "图片生成失败" + err.errMsg,
                        });
                    }, 300);
                },
            });
        }, 200);
    };

    // 商品文本
    const drawText = (ctx, w, h, text, tagw, rightX, rightY) => {
        var chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
        var temp = "";
        var row = [];
        ctx.setFontSize(14);
        ctx.setFillStyle("#000");
        for (var a = 0; a < chr.length; a++) {
            if (ctx.measureText(temp).width < w - 30) {
                temp += chr[a];
            } else {
                a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
                row.push(temp);
                temp = "";
            }
        }
        row.push(temp);
        //如果数组长度大于2 则截取前两个
        if (row.length > 2) {
            var rowCut = row.slice(0, 2);
            var rowPart = rowCut[1];
            var test = "";
            var empty = [];
            for (var a = 0; a < rowPart.length; a++) {
                if (ctx.measureText(test).width < w) {
                    test += rowPart[a];
                } else {
                    break;
                }
            }
            empty.push(test);
            var group = empty[0] + "..."; //这里只显示两行，超出的用...表示
            rowCut.splice(1, 1, group);
            row = rowCut;
        }
        for (var b = 0; b < row.length; b++) {
            if (b === 0) {
                console.log(tagw, "balue");
                ctx.fillText(row[b], tagw + 10 + rightX, h + b * 18 + rightY, w - 30);
            } else {
                ctx.fillText(row[b], 10 + rightX, h + b * 18 + rightY, w);
            }
        }
    };

    // 处理多张网络图片
    const processMultipleImages = (url) => {
        return new Promise((resolve, reject) => {
            Taro.getImageInfo({
                src: url,
                success: (res) => {
                    resolve(res);
                },
                fail: (err) => {
                    reject(err);
                    console.log(err, "err");
                    Taro.showToast({
                        icon: "none",
                        title: "图片生成失败" + err.errMsg,
                    });
                },
            });
        });
    };

    // 保存图片
    const saveImgFn = async () => {
        Taro.showLoading();
        if (flag === undefined) {
            Taro.hideLoading();
            Taro.authorize({
                scope: "scope.writePhotosAlbum",
                success: () => {
                    Taro.canvasToTempFilePath({
                        canvasId: "product",
                        success: (res) => {
                            const { tempFilePath } = res;
                            Taro.saveImageToPhotosAlbum({
                                filePath: tempFilePath,
                                success: () => {
                                    Taro.hideLoading();
                                    showToast({
                                        icon: "success",
                                        title: "图片保存成功",
                                    });
                                },
                                fail: () => {
                                    Taro.hideLoading();
                                    showToast({
                                        icon: "none",
                                        title: "图片保存失败",
                                    });
                                },
                            });
                        },
                    });
                },
                fail: () => {
                    showToast({
                        icon: "none",
                        title: "取消授权",
                    });
                },
            });
            setFlag(false);
            return;
        }

        if ((await flag) === false) {
            Taro.hideLoading();
            Taro.openSetting();
            return;
        }

        Taro.canvasToTempFilePath({
            canvasId: "product",
            success: (res) => {
                const { tempFilePath } = res;
                Taro.saveImageToPhotosAlbum({
                    filePath: tempFilePath,
                    success: () => {
                        Taro.hideLoading();
                        showToast({
                            icon: "success",
                            title: "图片保存成功",
                        });
                    },
                    fail: () => {
                        Taro.hideLoading();
                        showToast({
                            icon: "none",
                            title: "图片保存失败",
                        });
                    },
                });
            },
        });
    };


    return (
        <View className='product-shared'>
            <View className='shared-content'>
                <Canvas
                    className='shared-canvas'
                    style={{ visibility: "hidden", position: "absolute", top: "-9999px" }}
                    canvasId='product'
                />
                {src && (
                    <Image mode='widthFix' src={src} style={{ width: "100vw" }}></Image>
                )}
            </View>

            {/* <View className='shared-actions'>
                <View className='action' onClick={saveImgFn}>
                    <View className='bg_wrap1'>
                        <View className='action-bg shared-friend' />
                    </View>
                    <View>保存图片</View>
                </View>
            </View> */}
        </View>
    );
}

export default ProductDetail;
