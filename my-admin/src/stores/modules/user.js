//用户信息
import { http } from '@/http'
import { GET_USER_INFO } from '@/http/apis/user'
import { ref } from 'vue'
import { defineStore } from 'pinia'


const createModule = () => {
    const defData = {
        name: '超级管理员',
    }

    const data = ref()

    const actions = () => {
        data.value = {
            name: '更新后的数据'
        }
    }
    const name = GET_USER_INFO

    return { data, actions, name }
}

const userPinia = defineStore(GET_USER_INFO, createModule)


export default userPinia