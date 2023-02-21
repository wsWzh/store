import { typeOf } from "./typeOf.js";


// 判断参数是否为空
export function empty(){
    if (arguments.length > 1) {
        // 多个值的时候判断都为空
        return [...arguments].every(v => empty(v))
    }
    else {
        switch (typeOf(arguments[0])) {
            case 'array' : return Object.keys(arguments[0]).length === 0
            case 'string': return Object.keys(arguments[0]).length === 0
            case 'object': return Object.keys(arguments[0]).length === 0
            default      : return arguments[0] == null
        }
    }

}