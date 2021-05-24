export default {
  pages: [
    'pages/test/index',
    'pages/index/index',
  ],
  subpackages: [
    {
      root: 'subpages/',
      pages: [
        'create_pages_demo/index', // demo 页面
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#C2C2C2',
    selectedColor: '#FF8106',
    list: [
      {
        pagePath: 'pages/test/index',
        text: '测试',
      },
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
    ],
  },
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
    }
  }
}
