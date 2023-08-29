import * as methods from '../../../utils'
export * from '../../../utils'

export default {
    install(app, options){
        // app应用实例,options插件的配置项 app.use(xxx,{a:1})=>{a:1}
        Object.assign(app.config.globalProperties, methods)
        // 依赖注入 组件可以通inject获取
        app.provide('i18n', options)
    }
}