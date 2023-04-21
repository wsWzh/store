import { Axios } from "axios";
import { beforeRequest } from "./interceptors/beforeRequest.js";
import { resolveResponse, rejectResponse } from "./interceptors/beforeResponse.js";

export function createAxios(options = {}) {
    const axios = Axios.create({
        delay: 0,//限制最低反馈时间(作用于优化页面交互效果)
        silent: false, // 值为真时不显示预设异常提示
        intact: false, // 值为真时异步请求结果返回完整结果
        timeout: 7 * 1000,
        ...options
    })

    // 请求拦截器
    axios.interceptors.request.use(beforeRequest)

    // 响应拦截器
    axios.interceptors.response.use(resolveResponse, rejectResponse)

    /**
     * 外部调用函数
     * @param proxyHttpOptions { object }
     * @returns {Promise<*>}
     */
    function proxyAxios(proxyHttpOptions) {
        const { delay, intact } = Object.assign({}, options, proxyHttpOptions)
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

    proxyAxios.delete = (url, params, config) => {
        proxyAxios({ url, params, method: 'delete', delay: 500, ...config })
    }
    proxyAxios.get = (url, params, config) => {
        return proxyAxios({ url, params, method: 'get', delay: 500, ...config })

    }
    proxyAxios.put = (url, data, config) => {
        return proxyAxios({ url, data, method: 'put', delay: 500, ...config })
    }
    proxyAxios.post = (url, data, config) => {
        return proxyAxios({ url, data, method: 'post', delay: 500, ...config })
    }

    proxyAxios.interceptors = axios.interceptors

    return proxyAxios
}