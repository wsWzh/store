import { typeOf } from '@my-wzh/utils'


//字符串类型数字转数字类型
export function formatValue(value) {
    return typeOf(value, 'number') ? value : +value
}

/**
 * 简易版 object => name=value&name=value
 * @param obj { object }
 */
export function stringify(obj) {
    if (!typeOf(obj, 'object')) {
        return ''
    }
    const items = Object.keys(obj).map(name => {
        return `${name}=${String(obj[name])}`
    })
    return items.join('&')
}