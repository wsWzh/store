import * as methods from './methods/index.js'
export * from './methods/index.js'


export default {
    install(app){
        Object.assign(app.config.globalProperties, methods)
    }
}