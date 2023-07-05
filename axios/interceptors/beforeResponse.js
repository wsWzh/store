import {debug,typeOf} from '@my-wzh/utils'
import messageConfig from './messageConfig'

/**
 * 处理成功返回
 * @param response
 * @returns {Promise<*>|*}
 */
export function resolveResponse (response){
    debug('axios.interceptors.response>>>',response)
    const {data,config}=response
    const { success, message } = data
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

/**
 * 处理请求失败
 * @param error {{ message:string , response: object } }
 */
export function rejectResponse (error){
    const {response} =error
    error.message=messageConfig[response?.status || 500]
    return Promise.reject(error)
}