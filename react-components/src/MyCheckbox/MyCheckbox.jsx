import { withExtraProps } from "../_Hoc";
import { Checkbox } from "antd";
import { formatValue, typeOf } from "../_utils";
import { empty } from '@wzh-/utils'
import { useMemo } from "react";

/**
 * 复选框
 * 添加 props.options 作为选项数据
 * 通过设置 props.formatter 指定真实值和显示值
 * 栗子：formatter = ({id,name}) => [id,name]
 * 栗子：formatter = 'id,name'
 * 将多选值改造成 v,v,v... 的格式
 */
const MyCheckbox = withExtraProps(props => {
    
    const { value: v, update, options, children, onChange } = props

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
        onChange(checkedValues.join(','))
    }

    const _props = {
        ...props,
        value,
        onChange: _onChange,
        options: []//配置项优先级大于插槽
    }

    delete _props.update

    return <Checkbox.Group  {..._props} >
        {
            options.map(({ label, value, disabled }) => {
                return <Checkbox value={value} key={value} disabled={disabled}>{label}</Checkbox >
            }).concat(children)
        }
    </Checkbox.Group>
})

MyCheckbox.defaultProps = {
    ...MyCheckbox.defaultProps,
    update: () => { }
}


export default MyCheckbox;