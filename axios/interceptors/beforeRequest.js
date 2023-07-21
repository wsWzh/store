import { empty, typeOf } from '@my-wzh/utils/index'
import { stringify } from 'qs'

/**
 * 处理 post 和 put 请求时的参数
 */
export function beforeRequest(config) {
    console.log('请求拦截');
    const { type, data } = config
    if (empty(data)) {
        // get delete 请求参数不是data 直接返回
        return config
    }
    if (type === 'json') {
        // json传参直接返回
        return config
    }
    if (typeOf(data, 'formdata')) {
        return config
    }
    // data为普通对象或其他非标准类型转为字符串
    return Object.assign(config, { data: stringify(data) })
}