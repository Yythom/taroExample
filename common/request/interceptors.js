import {
  setStorageSync, showToast, login, getStorageSync,
} from '@tarojs/taro';
import { logInterceptor, timeoutInterceptor } from './interceptor/interceptors';
import http from './index';
import getBaseUrl from './baseURL';
// import { userStore } from 'store';

const LOGIN_PATH = '/client/v1/user/wechat/login';
const REFRESH_PATH = '/client/v1/user/refreshToken';

const baseURL = getBaseUrl();

const customInterceptor = (chain) => {
  const { requestParams } = chain;
  const { url, data } = requestParams; // 本次请求的url

  return chain.proceed(requestParams).then(async (res) => {
    let prevUrl = '';
    let prevData = null;
    // 当请求成功
    const { code, result, msg } = res.data;
    // TODO:当code为0，表示请求成功
    if (code !== '0') {
      showToast({
        title: msg,
        icon: 'none',
        duration: 1000
      })
      return Promise.resolve(false);
    } else if (code === 'F-000-000-401' || code === 'F-000-000-403') { // 重新登入的code
      let resp;
      // 如果不存在refreshToken，则是第一次使用，默认微信登录获取token
      // if (!getStorageSync('refreshToken')) {
      //   const subRes = await login();
      //   resp = await http.post(LOGIN_PATH, { code: subRes.code });
      //   resp.token && setStorageSync('token', resp.token);
      //   resp.refreshToken && setStorageSync('refreshToken', resp.refreshToken);
      //   resp.user && setStorageSync('user', resp.user);
      //   resp.session_key && setStorageSync('session_key', resp.session_key);
      //   // userStore.setUserInfo(resp.user);
      // } else { // 刷新token
      //   resp = await http.post(REFRESH_PATH, { token: getStorageSync('refreshToken') });
      //   resp.token && setStorageSync('token', resp.token);
      //   resp.refreshToken && setStorageSync('refreshToken', resp.refreshToken);
      //   // userStore.setUserInfo(getStorageSync('user'));
      // }
      prevUrl = url.substring(baseURL.length);
      prevData = data;
      // 重新发起上一次请求
      resp = await http.post(prevUrl, prevData);
      return Promise.resolve(resp);
    } else {  // 请求成功时
      return Promise.resolve(result);
    }

    // let msg = `${res.statusCode}：服务端错误！`;
    // if (res.statusCode === 404) msg = '404：接口不存在！';
    // showToast({
    //   icon: 'none',
    //   title: msg,
    // });
    // return Promise.reject();
  });
};

const interceptors = [customInterceptor, logInterceptor, timeoutInterceptor];

export default interceptors;
