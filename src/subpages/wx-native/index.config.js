export default {
    navigationBarTitleText: '测试',
    navigationStyle: 'custom',
    enablePullDownRefresh: true, //允许下拉刷新
    backgroundTextStyle: "dark",//dark：显示刷新动画
    enableShareAppMessage: true,
    usingComponents: {
        // "wxml-to-canvas": "../../wx_components/", // 书写第三方组件的相对路径
        "mp-vtabs": "../../wx_components/vtabs/index",
        "mp-vtabs-content": "../../wx_components/vtabs-content/index", // 书写第三方组件的相对路径
    }
}
