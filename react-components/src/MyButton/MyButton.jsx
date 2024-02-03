import { Button } from 'antd';
import React, {  useState } from 'react';
import { typeOf } from '@wzh-/utils';
import { useDeleteProps } from '../_hook';

/**
 * my-button 添加了 loading
 * loading : onClick 事件返回的是一个 promise 时自动触发 loading 效果
 * success ,error 配合MyTips提示
 * updateLoading 通知父组件Button的loding状态
 * @param {success, error, onClick} props
 * @returns
 */
const MyButton = (props) => {

    const { onSuccess, onError} = props

    const basicProps = JSON.parse(JSON.stringify(props))

    const [loading, setLoading] = useState(false)

    const useLoading = () => {
        setLoading(true)
        return () => {
            setLoading(false)
        }
    }

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
    _props = useDeleteProps(_props, keysToRemove)

    return <Button {..._props} onClick={onClick} />
}

MyButton.defaultProps = {
    onError: () => { },
    onSuccess: () => { },
    updateLoading:()=>{}
}

export default MyButton