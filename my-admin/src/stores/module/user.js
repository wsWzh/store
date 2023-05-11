//用户信息
import {http} from '@/http'
import { GET_USER_INFO } from '@/http/apis/user'
import { defineStore } from 'pinia'

const info ={
    name:'超级管理员',
}

export const userStore=defineStore('userInfo',{
    state:()=>{
        return {
            info
        }
    },
    actions:{
        async GET_USER_INFO(){
            this.info=await http.get(GET_USER_INFO)
        }
    }
})