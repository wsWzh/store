// 删减指定属性 和空元素
import { empty } from './empty.js'

export function reduceProps(target, fn) {
    if (empty(target)) {
        return {}
    }
    return Object.keys(target).reduce((props, name) => {
        const value = target[name]
        if (empty(value)) {
            return props
        }
        if (fn && fn(value, name, target)) {
            return props
        }
        return { ...props, [name]: value }
    }, {})
}

