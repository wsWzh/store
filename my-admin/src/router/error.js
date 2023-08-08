import { h, render, createVNode } from 'vue'
import ErrorComponent from '@/views/error/500.vue'
import { Spin } from '@arco-design/web-vue'

/**
 * 显示错误界面
 * @param error
 */
export function createErrorDoc(error) {
    const Vnode = createVNode(ErrorComponent, error)
    render(Vnode, document.getElementById('app'))
    closeLoading()

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
    const Vnode = h('div', { id: 'page-loading', style }, h(Spin, { size: 30, context }))

    // h 和 createVNode都是创建虚拟节点的 但是createVNode渲染节点的速度更快
    // h函数更灵活列如: 没有 props 时可以省略不写 children 可以是一个字符串
    // createVNode貌似只能接收数组类型的子节点 [h(Spin, { size: 30, context }),h(Spin, { size: 30, context })]
    render(createVNode(Vnode), document.body)
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
    closeLoading()
}