import { Descriptions, Button, Popover, Form } from 'antd'
import { MyUpload } from '@/components'
const useResolve = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('操作成功')
        }, 1500)
    })
}

const Test = () => {
    return <Form>
        <Form.Item name="load">
            <MyUpload accept="image/png,image/jpeg" />
        </Form.Item>
    </Form>
}

export default Test;