import * as keys from '@/http/apis/constant'
import { defineStore } from 'pinia';
import { empty } from '@my-wzh/utils'
import { http } from '@/http'
import { reactive, ref } from 'vue'

//缓存时间
const storageTimeOut = 1000 * 60 * 30 //30分钟


//处理常量接口 一般用于缓存选项类数据
const apis = Object.values(keys)

function buff(key) {
    return defineStore(key, () => {

        const isLoading=ref(false)

        const defData = JSON.parse(sessionStorage.getItem(key)) || { }

        const data = reactive(defData)

        const getters = () => {
            //数据空时或超过缓存时间调用actions重新拿值
            if ((empty(data.value) || Date.now() > data.datetime) && !isLoading.value) {
                return actions()
            }
            console.log(data.value || [],123);
            return data.value || []
        }

        const actions = async (params) => {
            isLoading.value=true
            try{
                data.value = await http.get(key, params)
                sessionStorage.setItem(key, JSON.stringify({ datetime: Date.now() + storageTimeOut, value: data.value }))
                return data.value
            }catch(error){
                data.value=[]
                console.error(`获取${key}数据失败：${error}`)
                throw error
            }

        }

        return { data, getters, actions }
    })
}

const constants = apis.reduce((acc, key) => {
    return { ...acc, [key]: buff(key) }
}, {})


export default constants
