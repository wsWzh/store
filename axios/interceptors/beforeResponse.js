import { typeOf } from '@my-wzh/utils'
import messageConfig from './messageConfig'

/**
 * 处理成功返回
 * @param response
 * @returns {Promise<*>|*}
 */
export function resolveResponse(response) {
    console.log('响应成功这里的response是axios.then', response);
    const { data, config } = response
    const { success, message } = data
    if (success) {
        return data
    }
    // 文件流并且不是json文件返回完整的response response的请求头能拿到文件名称
    if (typeOf(data, 'blob') && data.type !== 'application/json') {
        return response
    }
    const error = Object.assign(new Error(), { message, config, response })
    // 错误处理 return Promise.reject(error) 会走catch
    return Promise.reject(error)
}

/**
 * 处理请求失败
 * @param error {{ message:string , response: object } }
 */
export function rejectResponse(error) {
    console.log('响应失败这里的error是axios.catch', error);
    const { response } = error
    error.message = messageConfig[response?.status || 500]
    return Promise.reject(error)
}