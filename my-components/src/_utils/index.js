import { typeOf } from '@wangzhengheng/utils'


//字符串类型数字转数字类型
export function formatValue(value) {
    return typeOf(value, 'number') ? value : +value
}
