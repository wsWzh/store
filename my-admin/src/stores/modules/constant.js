import * as keys from '@/http/apis/constant'
import { defineStore } from 'pinia';
import { empty } from '@wangzhengheng/utils'
import { http } from '@/http'
import { reactive } from 'vue'

//缓存时间
const storageTimeOut = 1000 * 60 * 30 //30分钟


//处理常量接口 一般用于缓存选项类数据
const apis = Object.values(keys)

function buff(key) {
    return defineStore(key, () => {
        const defData = JSON.parse(sessionStorage.getItem(key)) || { }

        const data = reactive({ ...defData })

        const getters = () => {
            if (empty(data.value) || data.datetime < Date.now()) {
                return actions()
            }
            return data.value || []
        }

        const actions = async (params) => {
            data.value = await http.get(key, params)
            sessionStorage.setItem(key, JSON.stringify({ datetime: Date.now() + storageTimeOut, value: data.value }))
            return data.value
        }

        return { data, getters, actions }
    })
}

const constants = apis.reduce((acc, key) => {
    return { ...acc, [key]: buff(key) }
}, {})


export default constants
