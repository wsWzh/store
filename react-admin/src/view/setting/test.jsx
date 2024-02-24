import { Descriptions, Button, Popover, Form, Upload, Layout, Col, Input } from 'antd'
import { MyUpload, MyDownload, MyTips, MySelect, MyButton } from '../../components'
import { GET_DOWNLOAD, http, GET_OPTIONS, GET_TOKEN } from '../../http'
import { getStore } from '../../stores'
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import KeepAlive from 'react-activation'

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
    return http.post(GET_TOKEN, {})
}

// memo包裹的组件props没更新不会跟着父组件更新
// 如果传人是引用类型 由于父组件更新会重新创建 子组件认为props更新了也会更新 可以用useCallback缓存函数 useMemo缓存对象和数组
// 子组件修改自身的state值不会触发父组件的更新
// 子组件通过调用父组件传入的方法,如果该方法重新修改了父组件的state值会触发父组件更新
const PropsCom = React.memo((props) => {
    console.log('更新了', props);
    const [n, setN] = useState(0)
    return <>
        <div>测试组件更新</div>
        {n}
        <Button onClick={() => { setN(n + 1), props.fn() }}>更新子组件的值</Button>
    </>
})

const KeepCom=()=>{
    return <Input/>
}

const EventCom=()=>{
    const ref = useRef()
    const onClick = useCallback((e) => {
        // e不是原生的一个 事件对象, 而是 React 根据 W3C 规范定义出来的一个合成事件
        // 想要访问原生的事件对象, 可通过 nativeEvent 属性来获取
        // 原生事件上阻止事件冒泡, 那么事件就无法冒泡到 document, 那么合成事件自然无法执行
        console.log('点击了',e);
        e.preventDefault();
    },[]);

    useEffect(() => {
        // 绑定原生事件
        console.log(ref);
        ref.current.addEventListener('click', event => { event.stopPropagation(); console.log('[ 原生事件 ]',event);});
    }, []);

    return (
        <div
            ref={ref}
            onClick={onClick} // React 事件
        >事件机制</div>
    );

}


const Test = () => {
    console.log('父组件更新');
    const options = getStore(GET_OPTIONS, state => state.getter())

    const [number, setNumber] = useState(0)
    const [number2, setNumber2] = useState(0)
    const obj = {}
    const number3 = 1
    const obj2 = useMemo(() => {
        return {}
    }, [])
    const propsfn = useCallback(() => {
        setNumber(number + 1)
    }, [])

    const [show,setShow]=useState(true)


    return <Layout className='outlet-main'>
            <Form layout="inline" labelCol={{ flex: "200px" }}>
                <Col span={12}>
                    <Form.Item label='测试zustand数据持久化'>
                        <MySelect options={options} formatter="key,name" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label='测试401拦截'>
                        <MyButton onClick={onLogin}>触发401</MyButton>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label='测试props类型对组件的更新'>
                        <PropsCom number={number3} fn={propsfn} obj={obj} />
                        <PropsCom number={number2} fn={propsfn} obj={obj2} />
                        <Button onClick={() => setNumber(number + 1)}>更新number</Button>
                        <Button onClick={() => obj.a = 1}>更新obj</Button>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label='测试缓存组件'>
                        <Button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</Button>
                        没有缓存的组件
                        {show && <KeepCom />}
                        使用KeepAlive缓存的组件

                            <KeepCom />
                    </Form.Item>
                </Col>
            <Col span={12}>
                <Form.Item label='事件机制'>
                   <EventCom />
                </Form.Item>
            </Col>
            </Form>
        </Layout>
}

export default Test;