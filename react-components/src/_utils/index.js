export { typeOf } from '../../../utils';

/**
 * 字符串类型数字转数字类型
 * @param {*} value
 * @returns
 */
export function formatValue(value) {
    return isNaN(+value) ? value : +value
}

/**
 * 判断元素是否为按钮
 */

export const isButton = (vnode) => {
    return vnode?.type
        && (
            vnode.type.__ANT_BUTTON
            || vnode.type === 'button'
            || vnode.type.name === 'MyButton'
        )
}