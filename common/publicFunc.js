/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable func-names */
// 与系统相关的公共函数
import {
  getSystemInfoSync, getMenuButtonBoundingClientRect,
  openSetting, getSetting, showModal, showToast, getLocation,
  navigateTo, getUserInfo, switchTab, showLoading, hideLoading,
  hideToast,
  login,
  request,
  createSelectorQuery,
} from '@tarojs/taro';
import dayjs from 'dayjs';

import Config from './mapConfig';
import { formatSeconds } from './public';
// import { locationStore, userStore } from '../store';
// import UserService from '../service/UserService';

function compareVersion(va, vb) { //版本号
  const v1 = va.split('.');
  const v2 = vb.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10);
    const num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    } if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

let loadingFixStatus = false;


/**
 *  获取dom基本信息
 * @param {*} dom_className -目标dom类名
 */
function RefInfo(dom_className) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      createSelectorQuery().select(`.${dom_className}`).boundingClientRect(function (rect) {
        rect.id      // 节点的ID
        rect.dataset // 节点的dataset
        rect.left    // 节点的左边界坐标
        rect.right   // 节点的右边界坐标
        rect.top     // 节点的上边界坐标
        rect.bottom  // 节点的下边界坐标
        rect.width   // 节点的宽度
        rect.height  // 节点的高度
        resolve(rect);
      }).exec()
    }, 200);
  });
}

/**
 * 获取系统信息，增加了自定义导航头的高度为 navBarHeight + navBarExtendHeight
 */
function lkGetSystemInfo() {
  const systemInfo = getSystemInfoSync() || {
    model: '',
    system: '',
  };
  const ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
  let rect;
  try {
    rect = getMenuButtonBoundingClientRect ? getMenuButtonBoundingClientRect() : null;
    if (rect === null) {
      console.error('getMenuButtonBoundingClientRect error');
    }
    // 取值为0的情况  有可能width不为0 top为0的情况
    if (!rect.width || !rect.top || !rect.left || !rect.height) {
      console.error('getMenuButtonBoundingClientRect error');
    }
  } catch (error) {
    let gap = ''; // 胶囊按钮上下间距 使导航内容居中
    let width = 96; // 胶囊的宽度，android大部分96，ios为88
    if (systemInfo.platform === 'android') {
      gap = 8;
      width = 96;
    } else if (systemInfo.platform === 'devtools') {
      if (ios) {
        gap = 5.5; // 开发工具中ios手机
      } else {
        gap = 7.5; // 开发工具中android和其他手机
      }
    } else {
      gap = 4;
      width = 88;
    }
    if (!systemInfo.statusBarHeight) {
      // 开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    }
    rect = {
      // 获取不到胶囊信息就自定义重置一个
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width,
    };
  }

  let navBarHeight = '';
  if (!systemInfo.statusBarHeight) {
    // 开启wifi和打电话下
    systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    navBarHeight = (function () {
      const gap = rect.top - systemInfo.statusBarHeight;
      return systemInfo.statusBarHeight + 2 * gap + rect.height;
    }());
  } else {
    navBarHeight = (function () {
      const gap = rect.top - systemInfo.statusBarHeight;
      return systemInfo.statusBarHeight + 2 * gap + rect.height;
    }());
    if (ios) {
      systemInfo.navBarExtendHeight = 4; // 下方扩展4像素高度 防止下方边距太小
    } else {
      systemInfo.navBarExtendHeight = 0;
    }
  }

  systemInfo.navBarHeight = navBarHeight; // 导航栏高度不包括statusBarHeight
  // 右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87
  // 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
  systemInfo.capsulePosition = rect;
  systemInfo.ios = ios; // 是否ios
  // console.log('systemInfo', systemInfo);
  return systemInfo;
}

const systemInfo = lkGetSystemInfo();

/**
 * 引导用户授权定位
 */
async function lkGetLocation() {
  if (compareVersion(systemInfo.SDKVersion, '2.10.3') <= 0) {
    showModal({
      title: '更新提醒',
      content: '您当前的微信版本过低，为了给您提供更好的体验，请将您的微信更新至最新版本',
    });
    return null;
  }

  try {
    let location = null;
    const settingInfo = await getSetting();
    // 用户之前拒绝过获取定位授权
    if (settingInfo.authSetting['scope.userLocation'] !== undefined
      && settingInfo.authSetting['scope.userLocation'] !== true) {
      const modal = await showModal({
        title: '请求授权当前位置',
        content: '需要获取您的地理位置，请确认授权',
      });
      if (modal.cancel) {
        showToast({
          title: '拒绝授权',
          icon: 'none',
          duration: 1000,
        });
      } else if (modal.confirm) {
        const setting = await openSetting();
        if (setting.authSetting['scope.userLocation']) {
          showToast({
            title: '授权成功',
            icon: 'success',
            duration: 1000,
          });
          // 再次授权
          location = await getLocation({
            type: 'gcj02',
          });
        } else {
          showToast({
            title: '授权失败',
            icon: 'none',
            duration: 1000,
          });
        }
      }
    }
    // 尝试调用授权
    location = await getLocation({
      type: 'gcj02',
    });
    if (location) {
      console.log(location);
      // 存入location
    }
    return location;
  } catch (err) {
    return null;
  }
}

/**
 * 调起腾讯位置服务插件，让用户选择定位
 * @param {*} latitude
 * @param {*} longitude
 */
function lkGoToChangeLocation(latitude, longitude) {
  const location = JSON.stringify({ latitude, longitude });
  const url = `plugin://chooseLocation/index?key=${Config.LOCATION_KEY}&referer=${Config.APP_NAME}&location=${location}&category=${Config.SERVER_CATEGORY}`;
  navigateTo({
    url,
  });
}
// 调起腾讯插件地图导航
function mapRoute(name, lat, lng) {
  let endPoint = JSON.stringify({  //终点
    'name': name,
    'latitude': lat,
    'longitude': lng
  });
  navigateTo({
    url: 'plugin://routePlan/index?key=' + Config.LOCATION_KEY + '&referer=' + Config.APP_NAME + '&endPoint=' + endPoint + '&navigation=1'
  });
}



/**
 * 引导用户获取其个人信息
 */
async function lkGetUserInfo(url) {
  // eslint-disable-next-line no-undef
  if (!wx.canIUse('getUserProfile')) {
    if (compareVersion(systemInfo.SDKVersion, '1.1.0') <= 0) {
      showModal({
        title: '更新提醒',
        content: '您当前的微信版本过低，为了给您提供更好的体验，请将您的微信更新至最新版本',
      });
    }
    try {
      let userInfo = null;
      const settingInfo = await getSetting();
      // 用户之前拒绝过获取个人开放信息
      if (settingInfo.authSetting['scope.userInfo'] !== undefined && settingInfo.authSetting['scope.userInfo'] !== true) {
        return 'openSetting';
      }
      // 尝试调用授权
      userInfo = await getUserInfo();
      console.log(userInfo, 'userInfo');
      let userObj = {
        nickname: userInfo.userInfo.nickName,
        avatar: userInfo.userInfo.avatarUrl,
        gender: userInfo.userInfo.gender,
      };

      return userObj
    } catch (err) {
      return null;
    }
  } else {
    try {
      // eslint-disable-next-line no-undef
      let userInfo = await wx.getUserProfile({ desc: '用于完善会员资料' });
      let userObj = {
        nickname: userInfo.userInfo.nickName,
        avatar: userInfo.userInfo.avatarUrl,
        gender: userInfo.userInfo.gender,
      };
      return userObj
    } catch (err) {
      return null;
    }
  }
}

const getDetailLocation = async (desc) => {//'腾讯位置服务返回' 位置获取坐标
  const url = `${Config.MAP_SERVER_URL}/ws/geocoder/v1/?address=${desc}&get_poi=1&poi_options=radius=1000&key=${Config.LOCATION_KEY}`;
  const res = await request({
    method: 'GET',
    url,
  });
  const { data } = res;
  if (data.status !== 0 && data.result) {
    console.warn(data.message);
    return null;
  }
  const { result } = data
  const locationInfo = {
    address: Object.values(result.address_components).join(''), // 地址文字
    adcode: result.ad_info.adcode,
    latitude: result.location.lat,
    longitude: result.location.lng,
    name: desc,
    province: result.address_components.province, // 省
    city: result.address_components.city, // 市
    district: result.address_components.district, // 区
    street: result.address_components.street, // 街
  };
  return locationInfo
}


const getNearby = async (latitude, longitude) => {//'腾讯位置服务返回' 坐标获取位置
  const url = `${Config.MAP_SERVER_URL}/ws/geocoder/v1/?location=${latitude},${longitude}&get_poi=1&poi_options=radius=1000&key=${Config.LOCATION_KEY}`;
  const res = await request({
    method: 'GET',
    url,
  });
  const { data } = res;
  if (data.status !== 0 && data.result) {
    console.warn(data.message);
    return null;
  }
  const { result } = data;
  const locationInfo = {
    address: result.address,
    adcode: result.ad_info.adcode,
    latitude,
    longitude,
    name: result.formatted_addresses.recommend,
    province: result.address_component.province, // 省
    city: result.address_component.city, // 市
    district: result.address_component.district, // 区
    street: result.address_component.street, // 街
  };
  return locationInfo;
}

const getLocal = async () => { // 获取当前位置详情
  let getAd = await lkGetLocation();
  if (!getAd) return
  const res = await getNearby(getAd.latitude, getAd.longitude);
  if (res) {
    return res
  } else {
    return false
  }
}

/**
 * @param {*} setTimer -设置页面定时器id （用于清除）
 * @param {*} value -目标时间戳
 * @param {*} setTime -设置当前倒计时state str
 */
function countdown(setTimer, value, setTime) {
  let timer = setInterval(() => {
    value -= 1;
    let today_unix = dayjs(dayjs().format('YYYY-MM-DD')).unix(); // 当前时间
    let un = value - today_unix;
    if (un > 0) {
      setTime(formatSeconds(un));
    } else {
      setTime('');
      clearInterval(timer);
    }
  }, 999.8)
  setTimer(timer);
}


export {
  lkGetSystemInfo, // 获取系统基本信息
  systemInfo, //系统基本信息
  lkGetUserInfo, // 引导用户获取其个人信息

  lkGetLocation, // 授权定位
  lkGoToChangeLocation, // 调起腾讯地图选点，让用户选择定位
  getDetailLocation, //位置获取坐标
  getNearby, // 坐标获取位置
  getLocal, // 获取当前位置详情


  RefInfo, // 获取dom基本信息
  countdown, // 倒计时处理器

  lkShowModal,
  lkShowLoading,
  lkHideLoading,
};





function lkShowModal(title, content) {
  return new Promise((resolve, reject) => {
    showModal({
      title: title || null,
      content: content || content,
      success: (res) => {
        if (res.confirm) {
          resolve(true)
        } else if (res.cancel) {
          resolve(false)
        }
      },
    })
  });
}


/**
 * 显示Loading
 * @param {Object} options {title} wx.showLoading方法的参数对象
 */
function lkShowLoading(title) {
  loadingFixStatus = true;
  const param = { mask: true, title };
  showLoading(param);
}

/**
 * 隐藏Loading
 */
function lkHideLoading() {
  if (loadingFixStatus) {
    loadingFixStatus = false;
    hideLoading();
  }
}





function testChooseLocation() { // 地图选点返回
  // () => chooseLocation({
  //   success: async (res) => {
  //     lkShowLoading('加载中')
  //     console.log(res, 'res');
  //     let detail = await getNearby(res.latitude, res.longitude);
  //     console.log(detail);
  //     const locationInfo = {
  //       address: res.address, // 地址文字
  //       province: detail.result.address_component.province, // 省
  //       city: detail.result.address_component.city, // 市
  //       district: detail.result.address_component.district, // 区
  //       street: detail.result.address_component.street, //街
  //       latitude: res.latitude,
  //       longitude: res.longitude,
  //       name: res.name
  //     };

  //     dispatch(actions.setLocationAction(locationInfo));
  //     setTimeout(() => {
  //       lkHideLoading();
  //     }, 200);
  //   }
  // })
}
