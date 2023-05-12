import { IconArrowDown } from '@arco-design/web-vue/es/icon'

// 用户管理
export default {
    path: '/setting',
    name: 'Setting',
    meta: { title: '管理', icon: IconArrowDown },
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    redirect: { name: 'Setting' },
    children: [
        {
            path: '',
            name: 'SettingProduct',
            meta: { title: '用户列表' },
            component: () => import(/* webpackChunkName: "member" */ '@/views/setting/index.vue'),
        }
    ]
}