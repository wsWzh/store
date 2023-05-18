import { IconArrowDown } from '@arco-design/web-vue/es/icon'

// 用户管理
export default {
    path:'/member',
    name: 'Member',
    meta: { title: '管理', icon: IconArrowDown },
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    redirect: { name:'MemberList'},
    children:[
        {
            path:'',
            name:'MemberList',
            meta:{title:'用户列表'},
            component: () => import(/* webpackChunkName: "member" */ '@/views/member/index.vue'),
        }
    ]
}