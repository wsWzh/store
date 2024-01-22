import { withExtraProps } from "../_Hoc";
import { Select } from "antd";
import { formatValue, typeOf } from "../_utils";
import { empty, reduceProps } from '@wzh-/utils'
import { useMemo } from "react";

/**
 * 下拉框
 * 添加 props.options 作为选项数据
 * 通过设置 props.formatter 指定真实值和显示值
 * 栗子：formatter = ({id,name}) => [id,name]
 * 栗子：formatter = 'id,name'
 * mode=multiple时将多选值改造成 v,v,v... 的格式
 */
const MySelect = withExtraProps(props => {

    const { value: v, update, options, children, onChange, mode } = props

    const updateValue = v => {
        update(v)
        onChange(v)
    }

    const value = useMemo(() => {
        let selectValue = v
        if (mode === 'multiple') {
            if (empty(v)) {
                return []
            }
            if (typeOf(v, 'array')) {
                selectValue = v.map(formatValue)
            }
            selectValue=v.toString().split(',').map(formatValue)
            return selectValue
        } else {
            return formatValue(selectValue)
        }
    }, [v])

    const _onChange = (value) => {
        let v = value
        if (mode === 'multiple') {
            v = v.join(',')
        }
        updateValue(v)
    }

    let _props = {
        ...props,
        className: 'my-select',
        style: { width: '100%' },
        value,
        onChange: _onChange,
        options: []//配置项优先级大于插槽
    }

    const keysToRemove = ['update']

    _props = reduceProps(_props, ({ key }) => keysToRemove.includes(key))

    const items = options.map(({ label, value, disabled }) => {
        return <Select.Option disabled={disabled} key={value} value={value}>{label}</Select.Option>
    })

    return <Select  {..._props} >
        {
            children ? items.concat(children) : items
        }
    </Select>
})


export default MySelect;