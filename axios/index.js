import { Axios } from "axios";
import { beforeRequest } from "./interceptors/beforeRequest.js";
import { resolveResponse, rejectResponse } from "./interceptors/beforeResponse.js";

export function createAxios(options = {}) {
    const axios = Axios.create({
        timeout: 7 * 1000,
        ...options
    })

    // 请求拦截器
    axios.interceptors.request.use(beforeRequest)

    // 响应拦截器
    axios.interceptors.response.use(resolveResponse, rejectResponse)

    /**
 * @param proxyHttpOptions { object }
 * @param isSimple { boolean } 值为真时,只返回 result
 * @returns {Promise<unknown>}
    */
    function proxyAxios(proxyHttpOptions, isSimple = false) {
        const { delay = 500 } = Object.assign({}, options, proxyHttpOptions)
        const datetime = Date.now() + delay
        const awaitNext = fn => setTimeout(fn, datetime - Date.now())
        return new Promise((resolve, reject) => {
            axios(proxyHttpOptions).then(res => {
                awaitNext(() => resolve(isSimple ? res?.result : res))
            }).catch(error => {
                awaitNext(() => reject(error))
            })
        })
    }

    proxyAxios.delete = (url, params, config) => {
        proxyAxios({ url, params, method: 'delete', ...config }, true)
    }
    proxyAxios.get = (url, params, config) => {
        return proxyAxios({ url, params, method: 'get', ...config }, true)

    }
    proxyAxios.put = (url, data, config) => {
        return proxyAxios({ url, data, method: 'put', ...config }, true)
    }
    proxyAxios.post = (url, data, config) => {
        return proxyAxios({ url, data, method: 'post', ...config }, true)
    }
    
    proxyAxios.axios=axios

    proxyAxios.install = app => app.config.globalProperties.$http=proxyAxios

    return proxyAxios
}