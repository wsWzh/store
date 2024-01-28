import { Descriptions, Button, Popover, Form, Upload, Layout, Col } from 'antd'
import { MyUpload, MyDownload, MyTips, MySelect } from '../../components'
import { GET_DOWNLOAD, http, GET_OPTIONS } from '../../http'
import { getStore } from '../../stores'

const useResolve = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('操作成功')
        }, 1500)
    })
}

const handleDownload = () => {
    return http({ url: GET_DOWNLOAD, responseType: 'blob', intact: true })
}


const Test = () => {

    const options = getStore(GET_OPTIONS, state => state.getter())

    return <Layout className='outlet-main'>
        <Form>
            <Col span={6}>
                <Form.Item label='测试zustand数据持久化'>
                    <MySelect options={options} formatter="key,name" />
                </Form.Item>
            </Col>
        </Form>
    </Layout>
}

export default Test;