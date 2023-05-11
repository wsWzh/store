import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import stores from './stores'


import components from './components'


const app = createApp(App)

app.use(stores).use(router)
app.use(components)


app.mount('#app')
