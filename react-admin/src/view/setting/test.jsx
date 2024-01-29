import { Descriptions, Button, Popover, Form, Upload, Layout, Col } from 'antd'
import { MyUpload, MyDownload, MyTips, MySelect, MyButton } from '../../components'
import { GET_DOWNLOAD, http, GET_OPTIONS, GET_TOKEN } from '../../http'
import { getStore } from '../../stores'
import axios from 'axios'

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


const onLogin = (params) => {
    return http.post(GET_TOKEN,{})
}


const Test = () => {

    const options = getStore(GET_OPTIONS, state => state.getter())

    return <Layout className='outlet-main'>
        <Form layout="inline">
            <Col span={6}>
                <Form.Item label='测试zustand数据持久化'>
                    <MySelect options={options} formatter="key,name" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label='测试401拦截'>
                    <MyButton onClick={onLogin}>触发401</MyButton>
                </Form.Item>
            </Col>
        </Form>
    </Layout>
}

export default Test;