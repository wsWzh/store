import './index.css'
import MyLayoutHeader from './header'
import MyLayoutAside from './aside';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom'

const { Header, Footer, Sider, Content } = Layout;

const Index = () => {
    return <>
        <Layout className='my-layout'>
            <MyLayoutHeader/>
            <Layout>
                <MyLayoutAside></MyLayoutAside>
                <Layout>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    </>
}

export default Index;