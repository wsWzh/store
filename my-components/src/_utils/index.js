import { typeOf } from '@my-wzh/utils'


//字符串类型数字转数字类型
export function formatValue(value) {
    return isNaN(+value) ? value : +value
}

/**
 * 简易版 object => name=value&name=value
 * @param obj { object }
 */
export function stringify(obj) {
    if (!typeOf(obj, 'object')) {
        return ''
    }
    const items = Object.entries(obj).map(([key,value]) => {
        return `${key}=${String(value)}`
    })
    return items.join('&')
}