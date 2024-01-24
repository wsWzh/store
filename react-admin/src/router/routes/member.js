import { lazy } from 'react'

export default {
    path: '/member',
    name: 'Member',
    meta: { title: '用户管理' },
    component: lazy(() => import('@/layout/outletPage')),
    children: [
        {
            path: 'list',
            name: 'MemberList',
            routePath: '/member/list',
            meta: { title: '用户列表' },
            component: lazy(() => import('@/view/member')),
        }
    ]
}
