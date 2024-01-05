#### 文件描述
```
├─_components
    ├─src
       ├─MyButton 按钮
       ├─MyCheckbox 复选框
       ├─MyConfirm 确认弹窗
       ├─MyCrumb 面包屑
       ├─MyDateRange 日期范围选择
       ├─MyDownload 下载
       ├─MyDownloadTable 导出
       ├─MyInput 文本框
       ├─MyRadio 单选框
       ├─MySelect 下拉框
       ├─MySwitch 开关
       ├─MyTable 表格
       ├─MyTips 提示框
       ├─MyUpload 上传

```
#### 安装
```
npm install -D @wzh-/components
```
#### 使用
```
<!-- src/components/index -->
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import * as components form '@wzh-/components'

export default {
  install(app) {
    // 全局引入
    app.use(ArcoVue)

    // 自定义组件
    for(const name in components) {
      app.component(name , components[name])
    }

  }
}

<!-- src/main.js -->
import App from './App.vue'
import components from './components'

const app = createApp(App)
app.use(components)
```


