import { Layout, Menu, Button } from 'antd';
import { useMemo, useState } from 'react';
import { SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { empty } from '@wzh-/utils';
import { useNavigate, useLocation, matchRoutes } from 'react-router-dom';
import routes from '../router'
import { useMessage } from '../utils';
import { getStore } from '../stores'
import { GET_MENUS } from '../http';

const { Sider } = Layout;

const getRoutesMap = (routes) => {
    return routes.reduce((map, item) => {
        const { routePath, children } = item
        if (empty(children)) {
            return { ...map, [routePath]: item }
        }
        return { ...map, ...getRoutesMap(children) }
    }, {})
}

//路由数组转为键值对 routePath:item
const routesMap = getRoutesMap(routes)

/**
 * 左侧导航栏
 * accordion为true时开启手风琴效果
 * @param {*} props
 * @returns
 */
const MyLayoutAside = (props) => {
    const { accordion } = props
    const message = useMessage()
    const { pathname } = useLocation()
    const nav = useNavigate()
    const menuItems = getStore(GET_MENUS, state => state.data)


    const getMenuItem = (item, lv) => {

        let { routePath: key, children, name: label } = item
        let icon = lv === 0 ? <SettingOutlined /> : ''

        if (!empty(children)) {
            return {
                key,
                icon,
                label,
                children: children.map(i => getMenuItem(i, lv + 1))
            }
        }
        return { key, label }
    }


    const items = useMemo(() => {
        return menuItems.map(i => getMenuItem(i, 0))
    }, [menuItems])

    //打开的菜单
    const [openKeys, setOpenKeys] = useState()
    const onOpenChange = (keys) => {
        // 手风琴效果
        if (accordion) {
            const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
            const rootSubmenuKeys = menuItems.map(i => i.routePath);
            if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                setOpenKeys(keys)
            } else {
                setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
            }

        } else {
            setOpenKeys(keys)
        }
    }

    // 选中的菜单
    const selectedKeys = useMemo(() => {
        const matched = matchRoutes(routes, pathname);
        const matchedKyes = matched.map(item => item.route.routePath)
        setOpenKeys(matchedKyes)
        return pathname
    }, [pathname])

    const onSelect = (item) => {
        const { key } = item
        if (empty(routesMap[key])) {
            message.error('该页面不存在')
            return
        }
        nav(key)
    }



    // 导航栏伸缩
    const [collapsed, setCollapsed] = useState(false);

    return <>

        <Sider className='my-aside' collapsed={collapsed} collapsedWidth={60}>
            <Menu
                mode="inline"
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                items={items}
            />
            <div onClick={() => setCollapsed(!collapsed)} className={`collapsed-btn ${collapsed ? 'collapsed' : ''}`}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
        </Sider>
    </>

}



export default MyLayoutAside