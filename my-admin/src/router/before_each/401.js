import { debug,empty } from '@my-wzh/utils'
import { apis } from '@/http'
import { getStore } from '@/stores'
import { GET_MENUS, GET_USER_INFO } from '@/http'

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
    //GET_USER_INFO
    const needItems = [ GET_MENUS] //刚需数据
    if (witelist.includes(name)) {
        return true //白名单放行
    }
    //请求刚需数据
    for (let i = 0; i < needItems.length; i++) {
        const api = needItems[i]
        const needStore = getStore(api)
        if (empty(needStore.data)){
             await needStore.actions()
        }
    }
}

//401触发跳转登录
const handleError = (error, { href }) => {

}