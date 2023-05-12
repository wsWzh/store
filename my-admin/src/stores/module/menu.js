//菜单数据
import { http } from '@/http'
import { GET_MENUS } from '@/http/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 测试数据
let items = [
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

const state = () => {
    return {
        items
    }
}
const actions = {
    async GET_MENUS() {
        this.items = await http.get(GET_MENUS)
    }
}

export const menuStore = defineStore('menuInfo', () => {
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
    const items = ref([...defItems])
    const GET_MENUS = () => {
        items.value = []
    }
    return { items, GET_MENUS }
})