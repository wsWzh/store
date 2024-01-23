import { lazy } from 'react'

export default {
    path: '/',
    name: 'home',
    meta: { title: '首页' },
    component: lazy(() => import('@/view/home.jsx'))
}