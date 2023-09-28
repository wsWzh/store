
export default {
    path: '/',
    name: 'home',
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
}