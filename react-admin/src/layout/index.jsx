import './index.css'
import MyLayoutHeader from './header'
import MyLayoutAside from './aside';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom'
import { MyCrumb } from '../components'
import { Button } from 'antd'

const Index = () => {
    return <Layout className='my-layout'>
        <MyLayoutHeader />
        <Layout>
            <MyLayoutAside accordion />
            <Layout>
                <MyCrumb>
                    <Button>测试面包屑组件</Button>
                </MyCrumb>
                <Outlet />
            </Layout>
        </Layout>
    </Layout>
}

export default Index;