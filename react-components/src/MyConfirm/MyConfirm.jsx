import { Popover, Space, Row, Button } from 'antd'
import React, { useCallback, useState } from 'react'
import { MyTips, MyButton } from '../../index'

// 确定按钮
const Confirm = React.memo(({ updateDisabled, onConfirm }) => {
    return <MyButton updateLoading={updateDisabled} type="primary" onClick={onConfirm}>确定</MyButton>

})

// 取消按钮
const Cancel = ({ onCancel }) => {
    return <Button type="text" onClick={onCancel}>取消</Button>
}

const content = ({ updateDisabled, onConfirm, onCancel }) => {
    return <Row justify="end" style={{ paddingTop: '6px' }}>
        <Space>
            <Confirm updateDisabled={updateDisabled} onConfirm={onConfirm} />
            <Cancel onCancel={onCancel} />
        </Space>
    </Row>
}


const MyConfirm = (props) => {

    const onHide = () => {
        setTimeout(setOpen(false))
    }

    const { onCancel = onHide, onConfirm = onHide, children, title } = props


    const [disabled, setDisabled] = useState(false)

    const updateDisabled =useCallback((bool)=>{
        setDisabled(bool)
    })


    const [open, setOpen] = useState(false)

    const onOpenChange = useCallback((bool) => {
        setOpen(bool)
    })

    const isButton = useCallback((vnode) => vnode.type
        && (
            vnode.type.__ANT_BUTTON
            || vnode.type === 'button'
            || vnode.type.name === 'MyButton'
        ));


    const _children = () => {

        let btnProps = {
            className: 'my-confirm',
            disabled
        }

        // 判断单个插槽
        if (isButton(children)) {
            const { props } = children
            Object.assign(btnProps, props)
            return <children.type {...btnProps} />
        }

        if (children.length > 1) {
            children.find(item => isButton(item))
        }

        return children
    }

    let _props = {
        trigger: "click",
        content: content({ updateDisabled, onConfirm, onCancel }),
        title,
        open,
        onOpenChange,
        children: _children()
    }

    return <Popover  {..._props} />
}
MyConfirm.defaultProps = {
    title: '你确定要执行?'
}

export default MyConfirm;
