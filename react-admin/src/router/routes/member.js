import { lazy } from 'react'

export default {
    path: '/member',
    name: 'Member',
    routePath: '/member',
    meta: { title: '用户管理' },
    component: lazy(() => import('@/layout/outletPage')),
    children: [
        {
            path: 'list',
            name: 'MemberList',
            routePath: '/member/list',
            meta: { title: '用户列表' },
            component: lazy(() => import('@/view/member')),
        },
        {
            path: 'detail',
            routePath: '/member/detail',
            meta: { title: '用户详情', key:'/member/list' },
            component: lazy(() => import('@/view/member/detail')),
        }
    ]
}
