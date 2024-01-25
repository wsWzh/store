import { typeOf } from '@wzh-/utils'
import { Input } from 'antd'
import { useEffect, useState } from 'react'

/**
 * input 添加 pattern 属性
 * 在配置 pattern 正则表达式之后不满足条件的值将返回旧值
 * @param {*} props
 * @returns
 */
const MyInput = (props) => {

    const { pattern, update, value, onChange } = props

    const triggerChange = (value) => {
        onChange && onChange(value);
        setValue(value)
    };

    const [_value, setValue] = useState()

    // 模拟挂载后生命周期
    useEffect(() => {
        if (!typeOf(pattern, 'regexp')) {
            return setValue(value)
        }
        if (!pattern.test(value)) {
            //不符合正则 清空
            triggerChange('')
        } else {
            triggerChange(value)
        }

    }, [value])



    const _onChange = (e) => {
        const newValue = e.target.value

        if (typeOf(pattern, 'regexp') && !pattern.test(newValue)) {
            return //不更新值
        }
        triggerChange(newValue)
        update(newValue)
    }

    const _props = {
        ...props,
        className: 'my-input',
        value: _value,
        onChange: _onChange,
    }

    //不能用reduceProps处理不然输入框为空时校验不生效
    delete _props.update
    delete _props.pattern


    MyInput.TextArea = Input.TextArea;

    return <Input {..._props} />
}

MyInput.defaultProps = {
    pattern: '',
    update: () => { }
}

export default MyInput;
