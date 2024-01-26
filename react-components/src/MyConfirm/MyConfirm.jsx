import { Popover, Space, Row, Button } from 'antd'
import React, { useCallback, useState } from 'react'
import { MyTips, MyButton } from '../../index'
import { typeOf, empty } from '@wzh-/utils'
import { isButton } from '../_utils'

/**
 * 确认操作气泡卡片
 * 一般用于删除等操作
 */
const MyConfirm = (props) => {

    const onHide = () => setOpen(false)

    // 确定按钮
    const defConfirm = () => {
        return <MyTips error success placement="left">
            <MyButton type="primary" onClick={onConfirm}>确定</MyButton>
        </MyTips>

    }

    // 取消按钮
    const defCancel = () => {
        return <Button type="text" onClick={onCancel}>取消</Button>
    }

    const {
        onCancel = onHide,
        Cancel = defCancel,
        onConfirm = onHide,
        Confirm = defConfirm,
        children,
        title,
    } = props

    const [disabled, setDisabled] = useState(false)

    // 同步按钮状态
    const updateDisabled = useCallback((bool) => {
        setDisabled(bool)
    })


    const [open, setOpen] = useState(false)

    // 同步tips的open
    const updateVisible = useCallback((bool) => {
        // 执行时禁止修改open
        if (disabled) {
            return
        }
        setOpen(bool)
    })


    // 弹窗内容插槽
    const content = () => {
        const ContentChild = [Confirm(), Cancel()].map((item, index) => {
            const { type, props: itemProps } = item
            const { children: itemChildren } = itemProps

            let _itemProps = {
                ...itemProps,
                disabled,
                key: `confirm${index}`
            }

            if (type.name === 'MyTips') {
                const _itemChildren = typeOf(itemChildren, 'array') ? itemChildren : [itemChildren]
                const mybtn = _itemChildren.find(isButton)
                if (mybtn) {
                    Object.assign(_itemProps, { updateVisible, children: mybtn, updateDisabled })
                }
            }
            // 普通按钮
            return <item.type {..._itemProps} />
        })
        return <Row justify="end" style={{ paddingTop: '6px' }}>
            <Space>
                {ContentChild}
            </Space>
        </Row>
    }


    // 元素插槽
    const _children = () => {
        // 空插槽不处理
        if (empty(children)) {
            return
        }

        let btnProps = {
            className: 'my-confirm',
            disabled
        }

        const slotsDefault = typeOf(children, 'array') ? children : [children]

        const Btn = slotsDefault.find(isButton);
        if (Btn) {
            return <Btn.type  {...{ ...Btn.props, ...btnProps }} />
        } else {

            const _childrenProps = {
                ...btnProps,
                ...props
            }
            delete _childrenProps.onConfirm
            delete _childrenProps.Confirm
            delete _childrenProps.Confirm
            return <Button {..._childrenProps}>{children}</Button>
        }

    }

    let _props = {
        ...props,
        trigger: "click",
        autoAdjustOverflow: true,//气泡被遮挡时自动调整位置
        content: content(),
        title,
        open,
        onOpenChange: setOpen,
        children: _children(),

    }
    delete _props.Confirm

    return <Popover  {..._props} />
}
MyConfirm.defaultProps = {
    title: '你确定要执行?'
}

export default MyConfirm;
