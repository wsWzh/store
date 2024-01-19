import { Descriptions } from 'antd'
import React, { useState } from 'react'
import { MyButton, MyTips, MySwitch } from '../../components'
import { Button, Space, Tooltip } from 'antd'

const Cs = (props) => {
    const Children = props.children

    const success = () => {
        console.log('接收到子组件成功信息');
    }

    const error = () => {
        console.log('接收到子组件失败信息');
    }


    return <div >
        {React.cloneElement(props.children, { success, error })}
    </div>
}

const Cs1 = (props) => {
    console.log(123);

    return <div {...props}>
        112
    </div>
}

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

    return (
        <Descriptions title="测试封装的组件" column={1}>
            <Descriptions.Item label="按钮">
                <Space>
                    <MyButton type="primary" onClick={useResolve}>成功按钮</MyButton>
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
                <MySwitch onChange={useResolve}/>
            </Descriptions.Item>
        </Descriptions>
    )
}

export default Setting