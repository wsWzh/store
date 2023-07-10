import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import utils from './utils'

import components from './components'
import '@arco-themes/vue-siku/index.less'

const app = createApp(App)

app.use(pinia).use(router)
app.use(components).use(utils)


app.mount('#app')
