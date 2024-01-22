import { Descriptions } from 'antd'
import React, { useState } from 'react'
import { MyButton, MyTips, MySwitch, MyInput, MyDateRange } from '../../components'
import { Button, Space, Tooltip, Form, Input, DatePicker } from 'antd'

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



    const [params, setParams] = useState({
        input: '123',
        start: '2024-01-01',
        end: '2024-01-02',
        switch: 1

    })

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
                <MySwitch onChange={useResolve} />
            </Descriptions.Item>
            <Descriptions.Item label="输入框">
                <Space>
                    数字输入框: <MyInput value={params.input} pattern={/^\d+$/} update={v=>setParams({...params,input:v})}/>
                    字母输入框: <MyInput value={params.input} pattern={/^[a-zA-Z]+$/} />
                    金额输入框: <MyInput value={params.input} pattern={/^(\d{1,10})?(\.([0-9]{0,2}))?$/} />
                    手机号码输入框: <MyInput value={params.input} pattern={/^1?([3-9](\d{0,9})?)?$/} />
                </Space>
            </Descriptions.Item>
            <Descriptions.Item label="日期范围">
                <MyDateRange showTime end={params.end} start={params.start} updateDate={(start, end) => setParams({ ...params, start, end })} />
            </Descriptions.Item>
        </Descriptions>
    )
}

export default Setting