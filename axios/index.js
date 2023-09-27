import Axios from "axios";
import { beforeRequest } from "./interceptors/beforeRequest.js";
import { resolveResponse, rejectResponse } from "./interceptors/beforeResponse.js";

/**
 *
 * @param {object} options 外部预设的参数
 * @returns proxyAxios
 */
export function createAxios(options = {}) {

    const axios = Axios.create({
        type: 'form', // 传参格式，可选值[form|json]=> Content-Type:[application/x-www-form-urlencoded |application/json] 浏览器会根据传参的格式设置请求头
        delay: 0,//限制最低反馈时间(作用于优化页面交互效果)
        intact: false, // 值为真时异步请求结果返回完整结果(默认返回result)
        timeout: 1000 * 7, //超时时间 7s
        ...options
    })

    // 请求拦截器 request
    axios.interceptors.request.use(beforeRequest)

    // 响应拦截器 response 接受两个函数分别处理成功返回和失败返回
    axios.interceptors.response.use(resolveResponse, rejectResponse)

    /**
     * 外部调用函数
     * @param proxyHttpOptions { object } 实际请求的参数
     * @returns {Promise<*>}
     */
    function proxyAxios(proxyHttpOptions) {
        const { delay, intact } = Object.assign(options, proxyHttpOptions)
        const datetime = Date.now() + delay
        //datetime的Date.now()是发起请求时的时间戳,awaitNext的Date.now()是在请求响应后执行awaitNext时当前时间戳
        const awaitNext = fn => setTimeout(fn, datetime - Date.now())
        return new Promise((resolve, reject) => {
            axios(proxyHttpOptions).then(res => {
                awaitNext(() => resolve(intact ? res : res?.result))
            }).catch(error => {
                awaitNext(() => reject(error))
            })
        })
    }

    proxyAxios.delete = (url, params, config) => proxyAxios({ url, params, delay: 500, ...config, method: 'delete' })

    proxyAxios.get = (url, params, config) => proxyAxios({ url, params, delay: 500, ...config, method: 'get'})

    proxyAxios.put = (url, data, config) => proxyAxios({ url, data, delay: 500, ...config, method: 'put' })

    proxyAxios.post = (url, data, config) => proxyAxios({ url, data, delay: 500, ...config, method: 'post' })

    proxyAxios.interceptors = axios.interceptors

    return proxyAxios
}