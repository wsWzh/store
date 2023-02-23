import { empty, debug,typeOf } from '@wangzhengheng/utils'
import  { stringify } from 'qs'

// 处理 post 和 put 请求时的参数
export function beforeRequest (config) {
    const {type,data}=config
    debug('axios.interceptors.request >>>', config)
    if (empty(data)){
        return config
    }
    if(type==='json'){
        return config
    }
    if(typeOf(data,'formdata')){
        return config
    }
    return Object.assign(config,{data:stringify(data)})
}