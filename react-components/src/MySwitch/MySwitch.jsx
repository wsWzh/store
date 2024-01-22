import { typeOf } from '@wzh-/utils';
import { Switch } from 'antd';
import { useState } from 'react'

/**
 *
 * @param {*} props
 * @returns
 */
const MySwitch = (props) => {

    const { children, checkedValue, uncheckedValue, onChange: fn,value:v } = props

    const [loading, setLoading] = useState(false);

    const useLoading = () => {
        setLoading(true);
        return () => setLoading(false)
    }
    const bool = (v === checkedValue)
    console.log(bool, '123', v);
    const [value, setValue] = useState(bool)

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
        }
    }

    const _props = {
        ...props,
        className: 'my-switch',
        loading,
        onChange,
        value
    }



    return <Switch {..._props} />
}

MySwitch.defaultProps = {
    checkedValue: 1,
    uncheckedValue: 0
}

export default MySwitch;