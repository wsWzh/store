import {  empty } from '@my-wzh/utils'
import { ref,watch } from 'vue'


//处理页面缓存
/**
 * 如何缓存页面: 当页面设置了 name 属性
 * 如何清除缓存: 调用 removeKeepalive 主动删除
 */
export const keepaliveItems = ref([])

/**
 * 删除缓存
 * @param name { string }
 */

export function removeKeepalive(name) {
    keepaliveItems.value = keepaliveItems.value.filter(item => item !== name)
}


//添加缓存
export default function (to, from) {
    const { matched } = to
    const items=keepaliveItems.value

    const names = matched.map(({ components }) => components.default.name)
    // 缓存组件的 name 不可缺少
    if(names.some(v=>empty(v))){
        return true
    }

    //去重添加
    keepaliveItems.value=items.concat(names.filter(name=>!items.includes(name)))
}