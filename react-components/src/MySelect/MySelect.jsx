import { withExtraProps } from "../_Hoc";
import { Select } from "antd";
import { formatValue, typeOf } from "../_utils";
import { empty } from '@wzh-/utils'
import { useMemo } from "react";

/**
 * 下拉框
 * 添加 props.options 作为选项数据
 * 通过设置 props.formatter 指定真实值和显示值
 * 栗子：formatter = ({id,name}) => [id,name]
 * 栗子：formatter = 'id,name'
 * 将多选值改造成 v,v,v... 的格式
 */
const MySelect = withExtraProps(props => {
    console.log(props, 'select');
    const Option = Select.Option;

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
        className: 'my-select',
        value,
        onChange: _onChange,
        // options: []//配置项优先级大于插槽
    }

    delete _props.update

    return <Select  {..._props} >

    </Select>
})

MySelect.defaultProps = {
    ...MySelect.defaultProps,
    update: () => { }
}


export default MySelect;