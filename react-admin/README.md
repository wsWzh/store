# React + Vite

<div align="center">

基于 [Ant Design](https://ant.design/) 的 React18 后台模板。

</div>

## 🌲admin-ui 框架结构

```markdown
│  .gitignore     // Git提交时会自动忽略里面的文件或目录
│  index.html     // 入口页面
│  package.json   // 项目基本信息
│  README.md      // 项目说明
│  server.js    // 本地模拟api服务
│  vite.config.js // vite配置文件
│
├─public
│  │  favicon.ico
│  │
│  └─images
│          logo.png
│
└─src
    │  index.css // 全局样式
    │  main.jsx // 入口文件，引入全局使用的库、全局样式、设置路由、自定义主题等
    │
    │
    ├─components
    │      index.js // 全局组件注入
    │
    ├─http
    │  │  index.js  // 全局注入
    │  │  request.js// 异步请求封装
    │  │
    │  └─apis // 接口文件夹
    │
    │
    ├─layout          // 基础页面布局
    │      aside.jsx  // 左侧导航栏
    │      header.jsx // 顶部区域
    │      index.css  // layou样式
    │      index.jsx  // 结构布局
    │      outletPage.jsx  // 承载嵌套路由
    │
    │
    ├─router
    │  │  index.js // 路由配置
    │  │
    │  │─routes // 路由模块文件夹
    │  │
    │  └─utils
    │        index.jsx// 处理路由拦截、页面加载loading、处理跳转错误、页面缓存处理等
    │
    ├─stores
    │  │  index.js // 引入模块，导出仓库
    │  │
    │  └─modules
    │          constant.js // 常量
    │          menu.js // 导航菜单
    │          user.js // 用户信息
    │
    ├─utils
    │      index.js // 工具函数引入
    │
    └─views
        │  home.vue // 首页
        │
        ├─error // 接口调用失败返回页
        │      404.vue
        │      500.vue
        │
        ├─member // 示例
        │      columns.jsx
        │      detail.vue
        │      index.vue
        │      、、、
        │
        └─setting // 示例
                index.vue
                、、、

```

## ✨ 特性

- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。

## 📦 安装

```bash

```

```bash

```

## 🔨 示例

```bash

```

## ⌨️ 本地开发

```bash

```
