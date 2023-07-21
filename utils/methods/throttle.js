/**
 * 节流函数
 * @param {Function} func 执行的函数
 * @param {Number} delay 节流时间
 * @returns {Promise}
 */
function throttle(func, delay) {
    let timer;
    return function (...args) {
        const context = this;
        // 有定时器说明没过节流时间
        if (timer) {
            return
        }
        timer = setTimeout(()=> {
            func.apply(context, args);
            timer = null;
        }, delay);
    };
}