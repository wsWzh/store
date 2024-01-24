import { lazy } from 'react'
import { generateRouter } from "./utils"
import { useRoutes } from 'react-router-dom'

// import.meta.globEager 已经弃用，请使用 import.meta.glob('*', { eager: true }) 来代替。
const mods = import.meta.glob('./routes/*.js', { eager: true })

const children = Object.values(mods).map(item => item.default)

const routes = generateRouter([
    {
        path: '/',
        routePath: '/',
        name: 'layout',
        meta: { title: '页面布局' },
        component: lazy(() => import('@/layout')),
        children
    },
    {
        path: '/home',
        routePath: '/home',
        name: 'home',
        meta: { title: '首页' },
        component: lazy(() => import('@/view/home.jsx'))
    }
])

//
export function Routes() {
    return useRoutes(routes);
}



export default routes