import { empty } from './empty.js'

/**
 * 删减指定属性
 * @param { object }obj  需要处理的对象
 * @param { function } fn 返true时删减
 * @returns { object }
 */
export function reduceProps(obj, fn) {
    if (empty(obj)) {
        return {}
    }
    return Object.entries(obj).reduce((props, item) => {
        const [key, value] = item
        if (empty(value) || empty(fn)) {
            return props
        }
        if (fn({ key, value},obj)) {
            return props
        }
        return { ...props, [key]: value }
    }, {})
}
