import { typeOf } from '@wzh-/utils';
import { Switch } from 'antd';
import { useState } from 'react'

/**
 *
 * @param {*} props
 * @returns
 */
const MySwitch = (props) => {

    const { children, onChange } = props

    const [loading, setLoading] = useState(false);

    const useLoading = () => {
        setLoading(true);
        return () => setLoading(false)
    }

    const [value,setValue]=useState(false)

    const onClick = () => {
        const promise = onChange(value);
        if (typeOf(promise,'promise')){
            promise.then(res=>{
                setValue(true)
            }
            ).catch(err=>{
                setValue(false)
            }
            ).finally(useLoading())
        }
    }

    const _props = {
        ...props,
        className: 'my-switch',
        loading,
        onClick,
        value
    }

    return <Switch {..._props}/>
}

export default MySwitch;