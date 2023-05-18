import { IconSettings } from '@arco-design/web-vue/es/icon'

/**
 * 设置管理
 */
export default {
    path: '/setting',
    name: 'Setting',
    meta: { title: '系统管理', icon: IconSettings },
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    redirect: { name: 'SettingProduct' },
    children: [
        {
            path: '',
            name: 'SettingProduct',
            meta: { title: '商品设置' },
            component: () => import(/* webpackChunkName: "setting" */ '@/views/setting/index.vue'),
        },
    ]
}