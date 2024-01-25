import { useOptions } from "../_hook";
import { Checkbox } from "antd";
import { formatValue, typeOf } from "../_utils";
import { empty, reduceProps } from '@wzh-/utils'
import { useMemo } from "react";

/**
 * 复选框
 * 添加 options 作为选项数据
 * 通过设置 formatter 指定真实值和显示值
 * 栗子：formatter = ({id,name}) => [id,name]
 * 栗子：formatter = 'id,name'
 * 将多选值改造成 v,v,v... 的格式
 */
const MyCheckbox = (props) => {

    const { value: v, update, options, children, onChange, formatter } = props

    const _options = useOptions(options, formatter)

    const value = useMemo(() => {
        let checkedValues
        if (empty(v)) {
            return []
        }
        if (typeOf(v, 'array')) {
            checkedValues = v
        }
        checkedValues = v.toString().split(',')

        return checkedValues.map(formatValue)
    }, [v])

    const _onChange = (checkedValues) => {
        update(checkedValues.join(','))
        onChange && onChange(checkedValues.join(','))
    }

    let _props = {
        ...props,
        value,
        onChange: _onChange,
        options: []//配置项优先级大于插槽
    }

    const keysToRemove = ['update']
    _props = reduceProps(_props, ({ key }) => keysToRemove.includes(key))

    const items = _options.map(({ label, value, disabled }) => {
        return <Checkbox value={value} key={value} disabled={disabled}>{label}</Checkbox >
    })

    return <Checkbox.Group  {..._props} >{children ? items.concat(children) : items}</Checkbox.Group>
}

MyCheckbox.defaultProps = {
    update: () => { },
    formatter: 'label,value'
}

export default MyCheckbox;