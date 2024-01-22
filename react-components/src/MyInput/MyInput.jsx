import { typeOf, reduceProps } from '@wzh-/utils'
import { Input } from 'antd'
import { useMemo } from 'react'

/**
 * input 添加 pattern 属性
 * 在配置 pattern 正则表达式之后不满足条件的值将返回旧值
 * @param {*} props
 * @returns
 */
const MyInput = (props) => {

    const { pattern, update, value: v, onChange } = props

    const value = useMemo(() => {
        if (typeOf(pattern, 'regexp') && pattern.test(v)) {
            return v
        }
    }, [v])


    const _onChange = (e) => {

        const v = e.target.value

        if (typeOf(pattern, 'regexp') && pattern.test(v)) {
            onChange(v)
            update(v)
        }

    }

    let _props = {
        ...props,
        className: 'my-input',
        value,
        onChange: _onChange,
    }
    const keysToRemove = ['update', 'pattern']
    _props = reduceProps(_props, ({ key, value }) => keysToRemove.includes(key))

    MyInput.TextArea = Input.TextArea;

    return <Input {..._props} />
}

MyInput.defaultProps = {
    pattern: new RegExp,
    update: () => { },
    onChange: () => { }
}

export default MyInput;
