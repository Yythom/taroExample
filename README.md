# taro+redux-tookit初始化小程序（内置多轮子）
 taro——redux-tookit工具集 。

## Getting Start

安装依赖

```bash
npm i
# or
yarn
```

调试项目

```bash
# 选定要进行开发的平台，如 wechat，并调试
npm run dev:weapp   or    npm run buile:weapp
# or
yarn dev:weapp    or    yarn build:weapp
```


## 图标

通用图标全都以iconfont的形式存放在iconfont站点上，开发者需要加入iconfont的项目里面
```jsx
<Text className="iconfont icon-xxxx" />
```
xxx是图标的名称，设置css的font-size即可设置图标大小，设置color可以设置图标的颜色

## 注意
3、字体的粗细不要使用font-weight数值，细字选择lighter, 粗体选择bold！因为某些手机某些字体不支持数值粗细！

##  通用组件路径 /components
注：/components/style内置初始功能测试样式
##  通用功实用功能性函数 路径 /common/public.js  or  /common/publicFunc.js
注：/c
##  已有组件：
WithUserVerify ———— 登入信息集合验证高阶组件（登入集成） <br/>
Tabs.jsx ———— 可滑动（支持tab粘性定位）tab切换 <br/>
VTabs.jsx ———— 可滑动 竖状分类列表 切换 <br/>
Avatar.jsx ———— 小程序集合获取用户信息头像显示头像 <br/>
UpImage ———— 图片上传（可开启压缩） <br/>
CheckList.jsx ———— 多选列表 <br/>
BlurImg.jsx ———— 图片模糊加载 <br/>
DropDown.jsx ———— 下滑时弹出层 <br/>
FloadBottom.jsx ———— 下浮动弹出层（已增加不同手机底部安全距离） <br/>
HistorySearch.jsx ———— 包含历史记录及hot列表的搜索组件 <br/>
NavBar.jsx ———— 自定义页面头部信息 <br/>
Modal.jsx ———— 自定义的modal框 <br/>
Notice.jsx ———— 横向滚动式通告 <br/>
renderPages.jsx ————— 条件渲染多页中间页 <br/>
search.jsx ———— 标准搜索框 <br/>
Step.jsx ———— 步骤条 <br/>
Sticky.jsx ———— 粘性定位容器 <br/>
...

### 测试例子放置于pages/test/index.jsx