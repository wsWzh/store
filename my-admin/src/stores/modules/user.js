//用户信息
import { http } from '@/http'
import { GET_USER_INFO } from '@/http'
import { ref } from 'vue'
import { defineStore } from 'pinia'


const createModule = () => {
    const defData = {
        name: '超级管理员',
    }

    const data = ref()

    const actions = async () => {
        data.value = await http.get(GET_USER_INFO)
    }

    const getters = () => {
        if (empty(data.value)) {
            actions()
        }
        return data.value
    }

    return { data, actions, getters }
}

const userStore = defineStore(GET_USER_INFO, createModule)


export default userStore