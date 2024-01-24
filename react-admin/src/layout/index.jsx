import './index.css'
import MyLayoutHeader from './header'
import MyLayoutAside from './aside';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom'

const Index = () => {
    return <Layout className='my-layout'>
            <MyLayoutHeader/>
            <Layout>
                <MyLayoutAside accordion />
                <Layout>
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
}

export default Index;