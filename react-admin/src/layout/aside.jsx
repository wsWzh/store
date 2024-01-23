import { Layout } from 'antd';
import { menuList } from  '../stores'

const { Header, Footer, Sider, Content } = Layout;

const MyLayoutAside=(props)=>{
    console.log(menuList);
    return <>
        <Sider className='my-aside'>
            <div>MyLayoutAside</div>
        </Sider>
    </>

}

export default MyLayoutAside