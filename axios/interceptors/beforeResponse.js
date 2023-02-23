import {debug,typeOf} from '@wangzhengheng/utils'
import messageConfig from './message.config.js'

// 成功返回
export function resolveResponse (response){
    debug('axios.interceptors.response>>>',response)
    const {data,config}=response
    const message = data?.msg || data?.message || '服务异常'
    const success = data?.succ || data?.success
    Object.assign(data,{message,success})
    if (success){
        return data
    }
    if(typeOf(data,'blob')&&data.type!=='application/json'){
        return response
    }
    const error=Object.assign(new Error(message),{config,response})
    // 错误处理
    return Promise.reject(error)
}

// 失败返回
export function rejectResponse (error){
    const {response} =error
    error.message=messageConfig[response?.status || 500]
    return Promise.reject(error)
}