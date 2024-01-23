import { Layout, Menu } from 'antd';
import { menuList } from  '../stores'
import { useMemo } from 'react';
import {  MailOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const MyLayoutAside=(props)=>{
    console.log(menuList);

    const getMenuItem=(item,lv)=>{
        const { name, routeName, children } = item
        const Icon = <MailOutlined/>
        if (empty(children)){
            getMenuItem(children,lv+1)
        }
    }

    const items = useMemo(() => {
        return menuList.map(item => getMenuItem(item,0))
    }, [menuList])

    return <>
        <Sider className='my-aside'>
            <Menu items={items}/>
        </Sider>
    </>

}

export default MyLayoutAside