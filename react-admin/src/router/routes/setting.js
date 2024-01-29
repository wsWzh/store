import { lazy } from 'react'

export default {
    path: '/components',
    name: 'Components',
    routePath: '/components',
    meta: { title: '组件' },
    component: lazy(() => import('@/layout/outletPage')),
    redirect: '/components/basics',
    children: [
        {
            path: 'basics',
            name: 'BasicsComponents',
            routePath: '/components/basics',
            meta: { title: '基础组件',keepAlive:true },
            component: lazy(() => import('@/view/setting')),
            redirect: '/components/basics',
        },
        {
            path: 'test',
            name: 'BasicsComponents',
            routePath: '/components/test',
            meta: { title: '测试组件' ,},
            component: lazy(() => import('@/view/setting/test')),
        }
    ]
}
