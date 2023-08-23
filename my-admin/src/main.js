import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import utils from './utils'
import components from './components'

export const app = createApp(App)

app.use(components).use(utils).use(pinia).use(router)

//应用配置和资源注册完成后挂载
const cs=app.mount('#app')

// app.config.globalProperties.cs='123' //全局属性

// App根组件 app应用实例 cs根组件实例
console.log(app.config.globalProperties, App, cs);
