import { typeOf } from '@wzh-/utils';
import { Switch } from 'antd';
import { useEffect, useState } from 'react'

/**
 *
 * @param {*} props
 * @returns
 */
const MySwitch = (props) => {
    const { checkedValue, uncheckedValue, onChange: fn, value: v } = props

    const [loading, setLoading] = useState(false);

    const useLoading = () => {
        setLoading(true);
        return () => setLoading(false)
    }


    const [value, setValue] = useState()

    useEffect(() => {
        const bool = (v === checkedValue)
        setValue(bool)
    }, [v])

    const onChange = (bool) => {
        const value = bool ? checkedValue : uncheckedValue
        const promise = fn(value);
        if (typeOf(promise, 'promise')) {
            promise.then(res => {
                setValue(bool)
            }
            ).catch(err => {
            }
            ).finally(useLoading())
        } else {
            setValue(bool)
        }
    }

    const _props = {
        ...props,
        className: 'my-switch',
        loading,
        onChange,
        value
    }

    delete _props.checkedValue
    delete _props.uncheckedValue

    return <Switch {..._props} />
}

MySwitch.defaultProps = {
    checkedValue: 1,
    uncheckedValue: 0
}

export default MySwitch;