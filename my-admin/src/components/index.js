import ArcoVue from "@arco-design/web-vue/es/arco-vue";
// import '@arco-design/web-vue/dist/arco.css'//默认样式
import '@arco-themes/vue-siku/index.less'//自定义样式
// import * as components from '../../../my-components'
import * as components from '@wzh-/components'
import { asyncSelect } from './asyncSelect'
// import './theme.css'//自定义主题

export default {
    install(app) {
        app.use(ArcoVue)
        for (const name in components) {
            app.component(name, components[name])
        }
        app.component('asyncSelect', asyncSelect)//全局组件
    }
}