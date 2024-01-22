import { Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { MyButton, MyTips, MySwitch, MyInput, MyDateRange, MyRadio, MyCheckbox ,MySelect} from '../../components'
import { Button, Space, Tooltip, Form, Input, DatePicker, Radio, Checkbox, Select } from 'antd'

const { RangePicker } = DatePicker
const Setting = () => {

    const useResolve = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('操作成功')
            }, 1500)
        })
    }

    const useReject = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('操作失败')
            }, 1500)
        })
    }

    const useSwitch = val => {
        console.log(val);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('操作成功')
            }, 1500)
        })
    }

    const options = [
        { id: '1', name: '选项一' },
        { id: 2, name: '选项二', disabled: true },
        { id: 3, name: '选项三' },
    ]

    const getDetail = () => {
       return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    input: '123',
                    start: '2024-01-01',
                    end: '2024-01-02',
                    a: {
                        switch: 1
                    },
                    radio:1,
                    checkbox:'1,2'
                })
            })
        })
    }

    useEffect(() => {
        getDetail().then(res => {
            form.setFieldsValue(res);
            setParams(res)
        })
    }, [])

    const [params, setParams] = useState({})
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values, params);
    }

    return (
        <Descriptions title="测试封装的组件" column={1}>
            <div>
                {JSON.stringify(params)}
            </div>
            <Descriptions.Item label="按钮">
                <Space>
                    <MyButton type="primary" onClick={useResolve}>加载按钮 </MyButton>
                    <MyTips success >
                        <MyButton type="primary" onClick={useResolve}>成功提示</MyButton>
                    </MyTips>
                    <MyTips error>
                        <MyButton type="primary" onClick={useReject}>错误提示</MyButton>
                    </MyTips>
                    <MyTips success error>
                        <div>
                            多个按钮同步状态：
                        </div>
                        <MyButton type="primary" onClick={useResolve}>成功提示</MyButton>
                        <MyButton danger type="primary" onClick={useReject}>错误提示</MyButton>
                    </MyTips>
                </Space>
            </Descriptions.Item>
            <Descriptions.Item label="开关">
                <MySwitch onChange={useSwitch} value={params.a?.switch} />
            </Descriptions.Item>
            <Descriptions.Item label="输入框">
                <Space>
                    数字输入框: <MyInput value={params.input} pattern={/^\d*$/} update={v => setParams({ ...params, input: v })} />
                    字母输入框: <MyInput value={params.input} pattern={/^[a-zA-Z]+$/} />
                    金额输入框: <MyInput value={params.input} pattern={/^(\d{1,10})?(\.([0-9]{0,2}))?$/} />
                    手机号码输入框: <MyInput value={params.input} pattern={/^1?([3-9](\d{0,9})?)?$/} />
                </Space>
            </Descriptions.Item>
            <Descriptions.Item label="日期范围">
                <MyDateRange showTime end={params.end} start={params.start} update={(start, end) => setParams({ ...params, start, end })} />
            </Descriptions.Item>
            <Descriptions.Item label="单选">
                <MyRadio options={options} formatter="id,name" value={params.radio} update={radio =>setParams({...params,radio})}>
                    <Radio value={4}>选项4</Radio>
                    <Radio value={5}>选项5</Radio>
                </MyRadio>
            </Descriptions.Item>
            <Descriptions.Item label="复选">
                <MyCheckbox options={options} formatter="id,name" value={params.checkbox} update={checkbox => setParams({ ...params, checkbox })}>
                    <Checkbox value={4}>选项4</Checkbox>
                </MyCheckbox>
            </Descriptions.Item>
            <Descriptions.Item label="下拉">
                <MySelect options={options}>
                </MySelect>
                <Select options={options}></Select>
            </Descriptions.Item>
            <Descriptions.Item label="表单">
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="姓名" name="input" rules={[{ required: true }]}>
                        <MyInput pattern={/^\d*$/} ></MyInput>
                    </Form.Item>
                    <Form.Item label="开关" name={['a', 'switch']} rules={[{ required: true }]}>
                        <MySwitch></MySwitch>
                    </Form.Item>
                    <Form.Item label="日期" name="start" rules={[{ required: true }] }>
                        <MyDateRange end={params.end} start={params.start} update={(start, end) => setParams({ ...params, start, end })} />
                    </Form.Item>
                    <Form.Item label="单选" name="radio" rules={[{ required: true }]}>
                        <MyRadio options={options} formatter={({ id, name }) => [id, name]} value={1} >
                            <Radio value={4}>选项4</Radio>
                            <Radio value={5}>选项5</Radio>
                        </MyRadio>
                    </Form.Item>
                    <Form.Item label="多选" name="checkbox" rules={[{ required: true }]}>
                        <MyCheckbox options={options} formatter="id,name" value={params.checkbox} update={checkbox => setParams({ ...params, checkbox })}>
                            <Checkbox value={4}>选项4</Checkbox>
                        </MyCheckbox>
                    </Form.Item>
                    <MyButton type="primary" htmlType="submit">提交</MyButton>
                </Form>
            </Descriptions.Item>
        </Descriptions>
    )
}

export default Setting