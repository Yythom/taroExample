import { getCurrentPages, request, showToast } from "@tarojs/taro";
import { systemInfo } from '../common/publicFunc';

let flag = '';
let Breadcrumb = null;

// 每当有新的error信息加入  触发错误上报总api
export function netUpload(stack, error_item) {
    if (flag && Breadcrumb) {
        console.log(Breadcrumb.getStack(), error_item);
    }
}

// 将请求错误加入栈
export function newWorkStackPush(req_status, level, code, requestParams, res,) {
    if (flag) {
        Breadcrumb.push({
            type: 'request',
            category: 'debug',
            data: {
                req_status,
                requestParams,
                request: req_status === 'success' ? res : null,
            },
            code: code,
            level,
        });
    }
}

export async function initErrorNet(pushFn) { // 后台配置上报监控开关
    // console.log(pushFn);
    Breadcrumb = pushFn;
    // let flag = await request({
    //     url: 'https://api.integral.haimeiyx.com/shop/v1/login/send', //仅为示例，并非真实的接口地址
    //     method: 'POST',
    //     header: {
    //         'Content-Type': 'application/json', // 默认值
    //     },
    // });
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            flag = true
            resolve(true)
        }, 1000);
    });
}

