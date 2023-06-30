/**
 * 节流函数
 * @param {Function} func 执行的函数
 * @param {Number} limit 节流时间
 * @returns {Promise}
 */
export function throttle(func, limit) {
    // 初始化变量，用于保存上一次函数调用和调用的时间
    let lastFunc, lastRan;
    // 返回一个新的函数，用作原始函数的节流版本
    return function () {
        // 保存函数调用的上下文和参数
        const context = this;
        const args = arguments;
        // 如果函数之前没有被调用过，立即调用它并保存时间
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            // 如果函数之前已经被调用过，清除之前的定时器并设置新的定时器
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                // 如果上一次调用和当前时间之间的时间差大于或等于限制时间，再次调用函数并保存时间
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}