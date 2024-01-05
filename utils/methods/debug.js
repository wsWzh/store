/**
 * 调试信息
 */
export function debug(...args) {
    try {
        if (sessionStorage.getItem('debug') === 'true') {
            console.warn(...args)
        }
    } catch (e) {
        // server no sessionStorage
    }
}