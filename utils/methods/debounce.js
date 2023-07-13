
/**
 *防抖函数
 * @param {Function} func
 * @param {Number} delay
 * @returns {Function}
 */
export function debounce(func, delay=800) {
    let timeout;
    return function (...args) {
        const context = this;
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}