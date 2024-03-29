import { IconSettings } from '@arco-design/web-vue/es/icon'

/**
 * 组件管理
 */
export default {
    path: '/components',
    name: 'Components',
    meta: { title: '组件', icon: IconSettings },
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    redirect: { name: 'BasicsComponents' },
    children: [
        {
            path: 'basics',
            name: 'BasicsComponents',
            meta: { title: '基础组件' },
            component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/index.vue'),
        },
        {
            path: 'test',
            name: 'testComponents',
            meta: { title: '调试组件' },
            component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/test.vue'),
        },
        {
            path: 'jsx',
            name: 'jsxComponents',
            meta: { title: 'jsx渲染' },
            component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/jsx.vue'),
        },
        {
            path: 'nest',
            name: 'nestRoute',
            meta: { title: '嵌套路由' },
            redirect: { name: 'nestRoute1' },
            children:[
                {
                    path: 'nest1/:id?',
                    name: 'nestRoute1',
                    meta: { title: '嵌套路由1' },
                    component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/nest1.vue'),
                }
            ]
        },
    ]
}