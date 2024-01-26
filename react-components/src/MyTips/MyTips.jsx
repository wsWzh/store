import { empty, typeOf } from '@wzh-/utils';
import { Tooltip, Space } from 'antd';
import React, { useState, useEffect } from 'react';
/**
 * 通用操作提示
 * 配合子组件的 onError 、 onSuccess 事件提示信息
 * delay弹窗延时 success,error是否显示弹窗 传入string时为弹窗的提示内容
 * btnDisabled 多个按钮共同的disabled
 * updateVisible 通知父组件MyTips的弹窗状态
 * @param { delay, success, error} props
 * @returns
 */
const MyTips = (props) => {
    const { children, delay, success, error, updateVisible, btnDisabled } = props

    // 提示窗口的背景色
    const [color, setColor] = useState('')

    // 提示内容
    const [title, setTitle] = useState()

    const [disabled, setDisabled] = useState(false)

    const syncDisabled=bool=>{
        setDisabled(bool)
    }

    // 是否显示气泡
    const [open, setOpen] = useState(false)

    const changeOpen = bool => {
        setOpen(bool)
        setDisabled(bool)//设置子组件按钮
        updateVisible(bool)//通知父组件
    }

    useEffect(()=>{
    //   updateDisabled &&  updateDisabled(open)
    },[open])

    const showTips = info => {
        const { message } = info

        setTitle(message)

        typeOf(info, 'error') ? setColor('#F7676F') : setColor('#25C550')

        return new Promise(resolve => {
            setTimeout(() => {changeOpen(true)}, 1)//防止按钮loading导致弹窗错位
            setTimeout(() => { changeOpen(false), resolve(info) }, delay + 1)
        })
    }

    const onSuccess = async res => {
        if (success === false) {
            return
        }
        let message = res?.message || '操作成功'
        if (typeOf(success, 'string')) {
            message = success
        }
        showTips({ message })
    }

    const onError = (err) => {
        if (error === false) {
            return
        }
        let message = err?.message || '操作失败'
        if (typeOf(error, 'string')) {
            message = error
        }
        showTips(new Error(message))
    }


    if (!children) {
        return []
    }

    //多个插槽
    if (children.length > 1) {

        const tipsProps = {
            ...props,
            btnDisabled: disabled,
            updateVisible: syncDisabled
        }

        const Items = children.map((item, key) => {
            if (typeOf(item.type, 'function')) {
                return <MyTips {...tipsProps} key={key}>{item}</MyTips>
            } else {
                return <MyTips key={key}>{item}</MyTips>
            }
        })

        return <Space>
            {Items}
        </Space>
    }

    // 单个插槽
    let _children = children//普通标签

    // 组件
    if (typeOf(children.type, 'function') ||children.type.render) {
        //给子组件注入额外的props 为什么updateDisabled不能是syncDisabled syncDisabled是每个子节点自身的处理disabled的函数
        // updateDisabled来源于最外层的my-tips处理的是同一个disabled
        // _children = React.cloneElement(children,) updateLoading: updateVisible
      
        const _childrenProps = { ...children.props, onSuccess, onError, disabled: disabled||btnDisabled}
        _children = <children.type {..._childrenProps}/>
    }


    const _props = {
        ...props,
        overlayClassName: 'my-tips',
        open,
        color,
        title,
    }

    return <Tooltip {..._props} >
        {_children}
    </Tooltip>

}

MyTips.defaultProps = {
    delay: 1500, // 信息窗停留时间
    success: false, // 开/关 成功提示 (字符串时替换提示信息)
    error: false,//开/关 错误提示 (字符串时替换提示信息)
    updateVisible:()=>{}
}

export default MyTips;