export default {
  pages: [
    'pages/test/index',
    'pages/index/index',
  ],
  subpackages: [
    {
      root: 'subpages/create_pages_demo',
      pages: [
        'example/index',
      ],
    },
    {
      root: 'subpages/img_cop',
      pages: [
        'index',
      ],
    },
    {
      root: 'pages/canvasExample',
      pages: [
        'postersExample',
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

}
