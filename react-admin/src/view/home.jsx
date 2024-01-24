import { Row, Image } from 'antd'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const nav = useNavigate()
    return <>
        <Row align="middle" justify="center" style={{ height: '100%' }}>
            <Image onClick={() => nav('/member/list')} width="100px" src="logo.png" preview={false} />✨🍍
        </Row>
    </>
}

export default Home;