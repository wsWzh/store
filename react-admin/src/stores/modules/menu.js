const defItems = [
    {
        name: '组件',
        routePath: '/components',
        children: [
            {
                name: '基础组件',
                routePath: '/components/basics'
            }, {
                name: '调试组件(用于测试)',
                routePath: 'testComponents'
            },
            {
                name: 'jsx',
                routePath: '/components/jsxComponents'
            },
            {
                name: '嵌套路由',
                routePath: '/components/nestRoute',
                children: [{
                    name: '嵌套路由1',
                    routePath: '/components/nestRoute/nestRoute1'
                }]
            }
        ]
    },
    {
        name: '用户管理',
        routePath: '/member',
        children: [
            {
                name: '用户列表',
                routePath: '/member/list'
            }
        ]
    },
    {
        name: '一级菜单',
        routePath: '/testSub1',
        children: [
            {
                name: '二级菜单',
                routePath: '/testSub1/testSub2',
                children: [
                    {
                        name: '假路由',
                        routePath: '/testSub1/testItem'
                    }
                ]
            }
        ]
    }
]

export default defItems