export const homeRouter={
    path:'',
    name:'home',
    meta:{title:'首页'},
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
}

export default {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/RouterView.vue'),
    children:[
        homeRouter,
    ]
}