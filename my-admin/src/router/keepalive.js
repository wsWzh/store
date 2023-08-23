import { empty } from '@my-wzh/utils'
import { ref, watch } from 'vue'


//处理页面缓存
/**
 * 如何缓存页面: 当页面设置了 name 属性
 * 如何清除缓存: 调用 removeKeepalive 主动删除
 */
export const keepaliveList = ref([])

/**
 * 删除缓存
 * @param name { string }
 */

export function removeKeepalive(name) {
    keepaliveList.value = keepaliveList.value.filter(item => item !== name)
}


/**
 *
 * @param {*} to 当前路由
 * @param {*} from 上一个路由
 * @param {*} failure 错误信息
 * @returns
 */
export default function (to, from, failure) {
    //vue的响应式更新是异步的
    //放入宏任务队列中在下一个事件循环中执行
    // 确保在Vue的响应式更新完成后执行 确保keepaliveList的值是最新的
    setTimeout(() => {

        // 上一个页面name
        const fromPageName = from.matched.at(-1)?.components?.default?.name

        // 返回时自动删除上一个缓存
        if (usePopstate && fromPageName && keepaliveList.value?.at(-1) === fromPageName) {
            keepaliveList.value.pop()
            usePopstate = false
        }

        // 当前页面组件的 name
        const toPageName = to.matched.at(-1).components?.default.name

        // 缓存组件的 name 不可缺少
        if (toPageName == null) {
            return true
        }

        const items = keepaliveList.value
        // 删除旧记录
        const index = items.findIndex(item => item === toPageName)
        if (index > -1) {
            items.splice(index, 1)
        }
        // 去重添加
        keepaliveList.value = items.concat(toPageName)
    })
}

watch(keepaliveList, items => console.log('%c更新页面缓存', 'color:#33c648', items))


// 返回标识
let usePopstate = false

// 监听浏览器的前进和后退 打上返回标识
// history.back()、history.forward()、history.go()
// router.back()、router.go()
window.addEventListener('popstate', () => {
    usePopstate = true
})
