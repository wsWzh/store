import { empty } from '@wzh-/utils'
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

const needItems = [GET_MENUS, GET_USER_INFO] //刚需数据


export default async function (to, from) {
    const { name } = to
    if (witelist.includes(name)) {
        return  //白名单放行
    }
    //请求刚需数据
    for (let api of needItems) {
        const needStore = getStore(api)
        if (empty(needStore.data)) {
            await needStore.actions()
        }
    }
}