<div align="center">

基于 [Arco Design](https://arco.design/) 的 Vue3 后台模板。

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
    │  App.vue // 入口组件
    │  main.js // 入口js文件，引入全局使用的库、公共的样式和方法、设置路由等
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
    │      aside.vue  // 左侧导航栏
    │      header.vue // 顶部区域
    │      index.vue  // 结构布局 添加页面切换动画
    │
    │
    ├─router
    │  │  index.js // 路由配置、路由拦截器
    │  │
    │  │─before_each // 路由拦截器
    │  │     401.js // 处理登录失效
    │  │
    │  │─error.js //页面加载loading、处理跳转错误
    │  │
    │  │─keepalive.js // 页面缓存处理
    │  │
    │  └─routes    // 路由文件夹
    │
    ├─store
    │  │  index.js // 引入模块
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
