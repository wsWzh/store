import { Layout, Menu } from 'antd';
import { menuItems } from '../stores'
import { useMemo } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { empty } from '@wzh-/utils';
import { useNavigate, useNavigation, useLocation, useMatch } from 'react-router-dom';
import { useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;

const MyLayoutAside = (props) => {

    const { pathname } = useLocation()
    const nav = useNavigate()

    const matchs = useMemo(() => {
        let matchs=[]

        const getMatchs = (str) => {
            const newStr = str.replace(/\/[^\/]+$/, '')
            if(newStr){
                matchs.push(newStr)
                getMatchs(newStr)
            }
        }
        getMatchs(pathname)

        return matchs
    }, [pathname])

    const getMenuItem = (item, lv) => {

        let { name: label, routePath: key, children } = item

        let icon
        if (lv === 0) {
            icon = <SettingOutlined />
        }

        if (!empty(children)) {
            children.map(i => getMenuItem(i, lv + 1))
            return { label, key, children: children.map(i => getMenuItem(i, lv + 1, key)), icon }
        }

        return { label, key, icon }
    }


    const items = useMemo(() => {
        return menuItems.map(item => getMenuItem(item, 0, '/'))
    }, [menuItems])


    const [selectedKeys, setSelectedKeys] = useState([pathname])
    const onSelect = (item) => {
        const { key } = item
        setSelectedKeys(key)
        nav(key)
    }

    const [openKeys, setOpenKeys] = useState(matchs)
    const onOpenChange = (openKeys) => {
        setOpenKeys(openKeys)
    }

    return <>
        <Sider className='my-aside'>
            <Menu
                items={items}
                mode="inline"
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
            />
        </Sider>
    </>

}

export default MyLayoutAside