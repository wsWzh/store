import { lazy } from 'react'

export default {
    path: '/components',
    name: 'Components',
    meta: { title: '组件' },
    component: lazy(() => import('@/layout/outletPage')),
    children: [
        {
            path: 'basics',
            name: 'BasicsComponents',
            routePath: '/components/basics',
            meta: { title: '基础组件' },
            component: lazy(() => import('@/view/setting')),
        },
        {
            path: 'test',
            name: 'BasicsComponents',
            routePath: '/components/test',
            meta: { title: '基础组件' },
            component: lazy(() => import('@/view/setting/test')),
        }
    ]
}
