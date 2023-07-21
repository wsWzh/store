import { typeOf } from "./typeOf.js";

/**
 * 判断参数是否为空,多参数时判断所有参数是否为空
 * @returns {boolean}
 */
export function empty(...args) {
    if (args.length > 1) {
        // 多个值的时候判断都为空
        return args.every(v => empty(v))
    }
    else {
        switch (typeOf(args[0])) {
            case 'array' : return Object.keys(args[0]).length === 0
            case 'string': return Object.keys(args[0]).length === 0
            case 'object': return Object.keys(args[0]).length === 0
            default      : return args[0] == null
        }
    }
}