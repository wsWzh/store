import { typeOf } from '@wzh-/utils'
import { Input } from 'antd'
import { useState } from 'react'

/**
 * input 添加 pattern 属性
 * 在配置 pattern 正则表达式之后不满足条件的值将返回旧值
 * @param {*} props
 * @returns
 */
const MyInput = (props) => {

    const { pattern ,update} = props

    let value

    if (typeOf(pattern, 'regexp') && pattern.test(props.value)) {
        value = props.value
    }


    const onChange = (e) => {

        const { value: v } = e.target

        if (typeOf(pattern, 'regexp') && pattern.test(v)) {
            update(v)
        }
    }

    const _props = {
        ...props,
        className: 'my-input',
        value,
        onChange,
    }

    delete _props.update

    MyInput.TextArea = Input.TextArea;

    return <Input {..._props} />
}

MyInput.defaultProps = {
    pattern: '',
    update:()=>{}
}

export default MyInput;
