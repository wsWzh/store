import { debug,empty } from '@wangzhengheng/utils'
import { apis } from '@/http'
import { stores } from '@/stores'


// 处理401

//白名单不校验
const witelist = [
    'home',
    'lose',
    '404',
    '500'
]

export default async function  (to, from) {
    debug('router.beforeEach.401 >>>', to, from)
    const { name } = to
    const { GET_MENUS, GET_USER_INFO } = apis
    const needItems = [GET_USER_INFO, GET_MENUS] //刚需数据
    if (witelist.includes(name)) {
        return true //白名单放行
    }
    //请求刚需数据
    for (let i = 0; i < needItems.length; i++) {
        const api = needItems[i]
        const needStore = stores[api]()
        if (empty(needStore.data)){
             await needStore.actions()
        }
    }
}

//401触发跳转登录
const handleError = (error, { href }) => {

}