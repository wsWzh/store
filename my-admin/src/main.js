import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import utils from './utils'
import components from './components'

export const app = createApp(App)

app.use(components).use(utils).use(pinia).use(router)

app.mount('#app')
