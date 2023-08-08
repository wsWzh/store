import { IconArrowDown } from '@arco-design/web-vue/es/icon'

// 用户管理
export default {
    path: '/member',
    name: 'Member',
    meta: { title: '用户管理', icon: IconArrowDown },
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    redirect: { name: 'MemberList' },
    children: [
        {
            path: '/list',
            name: 'MemberList',
            meta: { title: '用户列表' },
            component: () => import(/* webpackChunkName: "member" */ '@/views/member/index.vue'),
        },
        {
            path: '/detail',
            name: 'MemberDetail',
            meta: { title: '用户详情', key:'MemberList' },
            component: () => import(/* webpackChunkName: "member" */ '@/views/member/detail.vue'),
        }
    ]
}