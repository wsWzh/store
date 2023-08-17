import * as mods from '@/http/apis/constant'
import { defineStore } from 'pinia';
import { empty } from '@my-wzh/utils'
import { http } from '@/http'
import { reactive } from 'vue'

//缓存时间
const storageTimeOut = 1000 * 60 * 30 //30分钟


//处理常量接口 一般用于缓存选项类数据
const urls = Object.values(mods)

function buff(url) {
    return defineStore(url, () => {

        const defData = JSON.parse(sessionStorage.getItem(url)) || {}

        const data = reactive(defData)

        const getters = (params) => {
            //数据空时或超过缓存时间调用actions重新拿值
            if (empty(data.value) || Date.now() > data.datetime) {
                actions(params)
            }
            console.log(data.value, 123);
            return data.value || []
        }

        const actions = async (params) => {
            const options = { url, params, delay: 0 }
            return http(options).then(res => {
                data.value = res
                sessionStorage.setItem(url, JSON.stringify({ datetime: Date.now() + storageTimeOut, value: data.value }))
            }).catch(error => {
                data.value = []
            })
        }

        return { data, getters, actions }
    })
}

const constants = urls.reduce((acc, url) => {
    return { ...acc, [url]: buff(url) }
}, {})


export default constants
