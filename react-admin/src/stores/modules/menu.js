const defItems = [
    {
        name: '组件',
        routeName: 'Components',
        children: [
            {
                name: '基础组件',
                routeName: 'BasicsComponents'
            }, {
                name: '调试组件(用于测试)',
                routeName: 'testComponents'
            },
            {
                name: 'jsx',
                routeName: 'jsxComponents'
            },
            {
                name: '嵌套路由',
                routeName: 'nestRoute',
                children: [{
                    name: '嵌套路由1',
                    routeName: 'nestRoute1'
                }]
            }
        ]
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

export default defItems