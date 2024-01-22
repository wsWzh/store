import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { typeOf } from '@wzh-/utils';
/**
 * my-button 添加了 loading
 * loading : onClick 事件返回的是一个 promise 时自动触发 loading 效果
 * success ,error 配合MyTips提示
 * @param {success, error, onClick} props
 * @returns
 */
const MyButton = (props) => {

    const { onSuccess, onError, updateDisabled } = props

    const basicProps = JSON.parse(JSON.stringify(props))//这里拷贝不了方法

    const [loading, setLoading] = useState(false)


    const useLoading = () => {
        setLoading(true)
        return () => setLoading(false)
    }

    useEffect(() => {
        updateDisabled && updateDisabled(loading)
    }, [loading])

    const onClick = (...args) => {
        const click = props.onClick
        if (!click) return
        const promise = (click[0] || click)(...args)
        if (typeOf(promise, 'promise')) {
            promise
                .then(res => onSuccess(res))
                .catch(err => onError(err))
                .finally(useLoading())
        }
    }

    // ...props 会导致组件频繁更新
    const _props = {
        ...basicProps,
        className: 'my-button',
        loading,
        disabled: props.disabled || loading,
    }

    delete _props.onSuccess //注入原生button自定义的参数会报错
    delete _props.onError

    return <Button {..._props} onClick={onClick} />
}

MyButton.defaultProps = {
    onError: () => { },
    onSuccess: () => { },
}

export default MyButton