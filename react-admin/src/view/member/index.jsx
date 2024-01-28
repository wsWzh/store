import { Form, Input, Button, Layout, Space, Col } from 'antd'
import { MyDateRange, MyTable } from '../../components'
import { http, GET_PAGE } from '../../http'
import { columns } from './columns'
import { useRef, useState } from 'react'

const Member = () => {

    const requestApi = async params => {
        const rs = await http.get(GET_PAGE, { pageSize: 20, ...params })
        return rs
    }

    const [selections, setSelections] = useState([
        {
            id: '61017nkp10qonjlvvl',
            name: '测试aji7ss357jg62b81',
            createTime: '2018-4-01 39:31:03',
            status: 1,
            picture: 'https://static-nk.liux.co/image8/13462fa/28194a0700023d15_400_400.jpg'
        }
    ])

    const searchSlot = ({ search, form }) => {
        return <>
            <Col span={6}>
                <Form.Item name="name" label="名称">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="name2" label="名称2">
                    <Input />
                </Form.Item>
            </Col>

            <Col span={6}>
                <Form.Item name="name3" label="名称3">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="start" label="创建时间">
                    <MyDateRange form={form} isForm endName="end" />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item name="name3" label="名称3">
                    <Input />
                </Form.Item>
            </Col>
            <Form.Item>
                <Space>
                    <Button type="primary" onClick={search}>查询</Button>
                    <Button onClick={() => search(null)}>重置</Button>
                    <Button onClick={() => search(null)}>新增</Button>
                </Space>
            </Form.Item>
        </>
    }

    const tableRef = useRef(null)

    return <Layout className='outlet-main'>
        以选择{selections.length}项
        <MyTable
            selections={selections}
            updateSelections={setSelections}
            bordered
            onRequest={requestApi}
            searchSlot={searchSlot}
            historySelect
            columns={columns}
            ref={tableRef}
        />
    </Layout>
}

export default Member;