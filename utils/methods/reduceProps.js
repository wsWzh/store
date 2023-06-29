/**
 * 删减指定属性
 * @param obj { object } 需要处理的对象
 * @param fn { function }
 * @returns { object }
 */
import { empty } from './empty.js'

export function reduceProps(obj, fn) {
    if (empty(obj)) {
        return {}
    }
    return Object.keys(obj).reduce((props, name) => {
        const value = obj[name]
        if (empty(value) || empty(fn)) {
            return props
        }
        if (fn({value, name},obj)) {
            return props
        }
        return { ...props, [name]: value }
    }, {})
}

