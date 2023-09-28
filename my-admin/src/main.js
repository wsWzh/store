import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import utils from './utils'
import components from './components'
import { Message } from '@arco-design/web-vue' //引入acro-design组件库 获得代码提示

export const app = createApp(App)

app.use(components).use(utils,{a:1}).use(pinia).use(router)

//应用配置和资源注册完成后挂载
 app.mount('#app')

// app.config.globalProperties.cs='123' //全局属性


// 避免局部错误导致 app 挂掉
app.config.errorHandler = (error, vm, info) => {
    // console.error('app.config.errorHandler', vm, info)
    return Promise.reject(error)
}
