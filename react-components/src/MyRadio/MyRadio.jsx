import { useOptions } from "../_hook";
import { Radio } from "antd";
import { formatValue } from "../_utils";
import { useEffect, useMemo, useState } from "react";

/**
 * 单选框
 * 添加 props.options 作为选项数据
 * 通过设置 props.formatter 指定真实值和显示值
 * 栗子：formatter = ({id,name}) => [id,name]
 * 栗子：formatter = 'id,name'
 */
const MyRadio = (props) => {

    const { value: v, update, options, children, formatter, onChange } = props

    const _options = useOptions(options, formatter)

    const value = useMemo(() => {
        return v
    }, [v])

    const _onChange = (e) => {
        const value = e.target.value
        update(value)
        onChange && onChange(value)
    }

    const _props = {
        ...props,
        class: 'my-radio',
        value: formatValue(value),
        onChange: _onChange,
        options: null//配置项优先级大于插槽
    }

    const items = _options.map(({ label, value, disabled }) => {
        return <Radio value={value} key={value} disabled={disabled}>{label}</Radio>
    })

    return <Radio.Group {..._props} > {children ? items.concat(children) : items}</Radio.Group>
}

MyRadio.defaultProps = {
    update: () => { },
    formatter: 'label,value'
}

export default MyRadio;