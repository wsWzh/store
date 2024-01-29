import { Row, Image } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'


const Home = () => {
    const navgate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();
    const onNav = () => {
        const goto = searchParams.get('goto')  || '/'
        navgate(goto, { replace:true })
    }
    return <>
        <Row align="middle" justify="center" style={{ height: '100%' }}>
            <Image onClick={onNav} width="100px" src="logo.png" preview={false} />✨🍍
        </Row>
    </>
}

export default Home;