export const homeRouter={
    path:'',
    name:'home',
    meta:{title:'首页'},
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
}

export default {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/RouterView.vue'),//首页和404的父组件不需要layout
    children:[
        homeRouter,
        {
            path:'/:other(.*)',
            name:'lose',
            component: () => import(/* webpackChunkName: "other" */ '@/views/error/404.vue'), // 404
        }
    ]
}