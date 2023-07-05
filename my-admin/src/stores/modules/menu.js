//菜单数据
import { http } from '@/http'
import { GET_MENUS } from '@/http/apis/user'
import { ref } from 'vue'
import { defineStore } from 'pinia'


const createModule = () => {
    const defItems = [
        {
            name: '基础组件',
            routeName: 'SettingProduct'
        },
        {
            name: '用户管理',
            routeName: 'Member',
            children: [
                {
                    name: '用户列表',
                    routeName: 'MemberList'
                }
            ]
        },
        {
            name: '一级菜单',
            routeName: 'testSub1',
            children: [
                {
                    name: '二级菜单',
                    routeName: 'testSub2',
                    children: [
                        {
                            name: '假路由',
                            routeName: 'testItem'
                        }
                    ]
                }
            ]
        }
    ]
    const data = ref([])

    const actions = () => {
        console.log('触发401', '401');
        data.value = defItems
        // data.value = await http.get(GET_MENUS)
    }

    const getters = () => {
        if (empty(data.value)) {
            actions()
        }
        return data.value
    }

    return { data, actions, getters }
}


const menuPinia = defineStore(GET_MENUS, createModule)

export default menuPinia

