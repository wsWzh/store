/**
 * 调试信息
 * 配合 hash 路由使用
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