import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { typeOf, reduceProps } from '@wzh-/utils';

/**
 * my-button 添加了 loading
 * loading : onClick 事件返回的是一个 promise 时自动触发 loading 效果
 * success ,error 配合MyTips提示
 * @param {success, error, onClick} props
 * @returns
 */
const MyButton = (props) => {

    const { onSuccess, onError, updateDisabled } = props

    const basicProps = JSON.parse(JSON.stringify(props))

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
    let _props = {
        ...basicProps,
        className: 'my-button',
        loading,
        disabled: props.disabled || loading,
    }

    const keysToRemove = [ 'onSuccess', 'onError']
    _props = reduceProps(_props, ({ key, value }) => keysToRemove.includes(key))

    return <Button {..._props} onClick={onClick} />
}

MyButton.defaultProps = {
    onError: () => { },
    onSuccess: () => { },
}

export default MyButton