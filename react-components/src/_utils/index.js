export { typeOf } from '../../../utils';

/**
 * 字符串类型数字转数字类型
 * @param {*} value
 * @returns
 */
export function formatValue(value) {
    return isNaN(+value) ? value : +value
}