import { lazy } from 'react'

export default {
    path: '/components',
    name: 'Components',
    meta: { title: '组件' },
    component: lazy(() => import('@/layout')),
    children: [
        {
            path: 'basics',
            name: 'BasicsComponents',
            meta: { title: '基础组件' },
            component: lazy(() => import('@/view/setting')),
        }
    ]
}
