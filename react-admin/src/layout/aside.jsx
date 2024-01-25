import { Layout, Menu } from 'antd';
import { useMemo } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { empty } from '@wzh-/utils';
import { useNavigate, useNavigation, useLocation, useMatch, Link } from 'react-router-dom';
import { useState } from 'react';
import routes from '../router'
import { useMessage } from '../utils';
import { getStore} from '../stores'
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

    const matchs = useMemo(() => {
        let matchs = []

        const getMatchs = (str) => {
            const newStr = str.replace(/\/[^\/]*$/, '')
            if (newStr) {
                matchs.push(newStr)
                getMatchs(newStr)
            }
        }
        getMatchs(pathname)

        return matchs
    }, [pathname])

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


    const [selectedKeys, setSelectedKeys] = useState([pathname])
    const onSelect = (item) => {
        const { key } = item
        if (empty(routesMap[key])) {
            message.error('该页面不存在')
            return
        }
        setSelectedKeys(key)
        nav(key)
    }
    const rootSubmenuKeys = menuItems.map(i => i.routePath);
    const [openKeys, setOpenKeys] = useState(matchs)
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

        // 手风琴效果
        if (accordion) {
            if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                setOpenKeys(keys)
            } else {
                setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
            }

        } else {
            setOpenKeys(keys)
        }
    }

    return <>
        <Sider className='my-aside'>
            <Menu
                mode="inline"
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                items={items}
            />
        </Sider>
    </>

}



export default MyLayoutAside