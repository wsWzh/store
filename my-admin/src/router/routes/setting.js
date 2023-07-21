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
    ]
}