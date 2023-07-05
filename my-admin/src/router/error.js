import { h, render, createVNode } from 'vue'
import ErrorComponent from '@/views/error/500.vue'
import { Spin } from '@arco-design/web-vue'
/**
 * 显示错误界面
 * @param error
 */
export function createErrorDoc(error) {
    const vnode = createVNode(ErrorComponent, error)
    render(vnode, document.getElementById('app'))
}

/**
 * 界面加载 loading
 * @param {string} context
 */
export function createLodingDoc(context) {
    const style = {
        zIndex: 9999,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    const vnode = h('div', { id: 'page-loading', style }, h(Spin, { size: 30, context }))
    render(createVNode(vnode), document.body)
}

/**
 *关闭loading
 */
export function closeLoading() {
    const el = document.getElementById('page-loading')
    el?.parentNode.removeChild(el)
}

/**
 * 处理路由异常
 * @param error
 * @param to
 * @param from
 */
export function onError(error, to, from) {
    console.log('router.onError', error, to, from)
    createErrorDoc(error)
}