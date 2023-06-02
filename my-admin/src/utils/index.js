import * as methods from '../../../utils'
export * from '../../../utils'

export default {
    install(app){
        Object.assign(app.config.globalProperties, methods)
    }
}