import Axios from "axios";
import { beforeRequest } from "./interceptors/beforeRequest.js";
import { resolveResponse, rejectResponse } from "./interceptors/beforeResponse.js";

export function createAxios(options = {}) {
    const axios = Axios.create({
        type: 'form', // 传参格式，可选值[form|json]
        delay: 0,//限制最低反馈时间(作用于优化页面交互效果)
        intact: false, // 值为真时异步请求结果返回完整结果(默认返回result)
        timeout: 1000 * 7,
        ...options
    })

    // 请求拦截器 request
    axios.interceptors.request.use(beforeRequest)

    // 响应拦截器 response 接受两个函数分别处理成功返回和失败返回
    axios.interceptors.response.use(resolveResponse, rejectResponse)

    /**
     * 外部调用函数
     * @param proxyHttpOptions { object }
     * @returns {Promise<*>}
     */
    function proxyAxios(proxyHttpOptions) {
        const { delay, intact } = Object.assign({}, options, proxyHttpOptions) //优先级proxyHttpOptions>options
        const datetime = Date.now() + delay
        const awaitNext = fn => setTimeout(fn, datetime - Date.now())
        return new Promise((resolve, reject) => {
            axios(proxyHttpOptions).then(res => {
                awaitNext(() => resolve(intact ? res : res?.result))
            }).catch(error => {
                awaitNext(() => reject(error))
            })
        })
    }

    proxyAxios.delete = (url, params, config) => proxyAxios({ url, params, method: 'delete', delay: 500, ...config })

    proxyAxios.get = (url, params, config) => proxyAxios({ url, params, method: 'get', delay: 500, ...config })


    proxyAxios.put = (url, data, config) => proxyAxios({ url, data, method: 'put', delay: 500, ...config })

    proxyAxios.post = (url, data, config) => proxyAxios({ url, data, method: 'post', delay: 500, ...config })


    proxyAxios.interceptors = axios.interceptors

    return proxyAxios
}