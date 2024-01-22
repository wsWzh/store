import { typeOf,reduceProps } from '@wzh-/utils';
import { Switch } from 'antd';
import { useMemo, useState } from 'react'

/**
 * 开关添加loading
 * loading : onChange 事件返回的是一个 promise 时自动触发 loading 效果
 * success ,error 配合MyTips提示
 * @param {*} props
 * @returns
 */
const MySwitch = (props) => {

    const {
        checkedValue,
        uncheckedValue,
        onChange: fn,
        value: v,
        onSuccess,
        onError,
     } = props

    // mytips的子组件直接注入props会造成移入移出频繁渲染
    const basicProps = JSON.parse(JSON.stringify(props))

    const [loading, setLoading] = useState(false);

    const useLoading = () => {
        setLoading(true);
        return () => setLoading(false)
    }

    const value = useMemo(() => {
        const bool = (v === checkedValue)
        return bool
    }, [v])

    const onChange = (bool) => {
        const value = bool ? checkedValue : uncheckedValue
        const promise = fn(value);
        if (typeOf(promise, 'promise')) {
            promise
                .then(res => onSuccess(res))
                .catch(err => onError(err))
                .finally(useLoading())
        }
    }

    let _props = {
        ...basicProps,
        className: 'my-switch',
        loading,
        onChange,
        value
    }

    const keysToRemove = ['checkedValue', 'uncheckedValue', 'onSuccess', 'onError','updateDisabled']
    _props = reduceProps(_props, ({ key, value }) => keysToRemove.includes(key))

    return <Switch {..._props} />
}

MySwitch.defaultProps = {
    checkedValue: 1,
    uncheckedValue: 0,
    onSuccess: () => { },
    onError: () => { },
}

export default MySwitch;