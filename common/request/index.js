import { getStorageSync } from '@tarojs/taro';
import getBaseUrl from './baseURL';
import wx from './wxapi';
import interceptors from './interceptors';

interceptors.forEach((item) => wx.addInterceptor(item));

class HttpRequest {
  baseOptions(params, method = 'POST') {
    const { url, data, contentType = 'application/json' } = params;
    const BASE_URL = getBaseUrl(url);
    const option = {
      url: BASE_URL + url,
      data,
      method,
      header: {
        'Content-Type': contentType,
        // token: getStorageSync('token'),
      },
    };
    return wx.request(option);
  }

  get(url, data = '') {
    return this.baseOptions({ url, data }, 'GET');
  }

  post(url, data, contentType) {
    return this.baseOptions({ url, data, contentType });
  }
}

const http = new HttpRequest();

export default http;
