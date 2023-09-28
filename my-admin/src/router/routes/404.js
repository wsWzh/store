export default {
    path: '/:other(.*)',
    name: 'lose',
    component: () => import(/* webpackChunkName: "other" */ '@/views/error/404.vue'), // 404
}