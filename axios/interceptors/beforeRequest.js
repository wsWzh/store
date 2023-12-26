import { empty, typeOf } from '@wzh-/utils'
import { stringify } from 'qs'

/**
 * 处理 post 和 put 请求时的参数
 */
export function beforeRequest(config) {
    const { type, data } = config
    // get delete 请求参数为params不是data 直接返回
    if (empty(data)) {
        return config
    }
    //不处理传参 json传参Object 浏览器请求头自动生成Content-Type: "application/json"
    if (type === 'json') {
        return config
    }
    // 上传 浏览器请求头自动生成 Content-Type:multipart/form-data;
    if (typeOf(data, 'formdata')) {
        return config
    }
    //处理传参为name = 张三 & age=30
    // form传参String 浏览器请求头自动生成Content-Type: "application/x-www-form-urlencoded"
    return Object.assign(config, { data: stringify(data) })
}