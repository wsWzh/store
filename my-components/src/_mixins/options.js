import { typeOf } from '@wangzhengheng/utils'
import { formatValue } from '../_utils'
/**
 * 选择组件复用模块
 * props.options：用于生成选择项
 * props.formatter：用于把 options 提供的数据转换成组件需要的格式
 * 栗子：formatter = ({id,name}) => [id,name]
 * 栗子：formatter = 'id,name'
 */


export default {
    inheritAttrs: true,
    emits: ['update:modelValue', 'change'], //事件名称不包括逗号。事件名称不包括模板中
    props: {
        modelValue: { type: [String, Number, Array] },
        options: { type: Array, default: () => [] },
        formatter: { type: [String, Function], default: 'value,label' },
        onChange: Function
    },
    computed: {
        // 处理返回值
        onUpdate({ modelValue }) {
            const doUpdate = v => {
                console.log(v);
                this.$emit('update:modelValue', v)
            }
            return value => {
                if (typeOf(value, 'array')) {
                    if (typeOf(modelValue, 'array')) {
                        return doUpdate(value)
                    }
                    return doUpdate(value.join(','))
                }
                doUpdate(value)
            }
        },
        //处理组件选项
        formatOptions({ formatter, options }) {
            return options.map(option => {
                // formatter=({id,name})=>[id,name]
                if (typeOf(formatter, 'function')) {
                    const _props = formatter(option)
                    if (typeOf(_props, 'array')) {
                        const value = formatValue(_props[0])
                        return { value, label: _props[_props.length - 1] }
                    }
                    return {}
                }
                //formatter='id,name'
                if (typeOf(formatter, 'string')) {
                    const items = formatter.split(',')
                    const value = formatValue(option[items[0]])
                    const label = option[items[items.length - 1]]
                    return { ...option, value, label }
                }
                return option
            })
        }

    }
}