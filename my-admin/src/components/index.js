import ArcoVue from "@arco-design/web-vue/es/arco-vue";
import '@arco-design/web-vue/dist/arco.css'
import * as components from '../../../my-components'

export default {
    install(app){
        app.use(ArcoVue)
        for(const name in components){
            app.component(name,components[name])
        }
    }
}