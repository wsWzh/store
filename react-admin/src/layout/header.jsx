import { Row, Image, Avatar, Divider } from 'antd'
import { getStore } from '../stores'
import { GET_USER_INFO } from '../http'

const MyLayoutHeader = (props) => {

    const userInfo = getStore(GET_USER_INFO, state => state.data)

    const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

    return <>
        <Row className='header' justify="space-between">
            <Row className='logo'>
                <Image preview={false} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
                <h3>后台模板</h3>
            </Row>
            <Row align="middle">
                <Avatar src={circleUrl} size={26} />
                <Divider type="vertical" />
                <h5>{userInfo?.name}</h5>
            </Row>
        </Row>
    </>
}

export default MyLayoutHeader;