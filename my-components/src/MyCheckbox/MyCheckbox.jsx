import { computed } from 'vue'
import { empty, typeOf } from '@my-wzh/utils'
import mixin from '../_mixins/options'
import { formatValue } from '../_utils'


/**
 * 复选框
 * 添加 props.options 作为选项数据
 * 通过设置 props.formatter 指定真实值和显示值
 * 将多选值改造成 v,v,v... 的格式
 */
export default {
    name: 'MyCheckbox',
    emits: [],
    mixins: [mixin],
    setup(props, { attrs, slots, emit }) {

        //转为array
        const modelValue = computed(() => {
            let { modelValue } = props
            if (empty(modelValue)) {
                return []
            }
            if (typeOf(modelValue, 'string') || typeOf(modelValue, 'number')) {
                modelValue = String(modelValue).split(',')
            }
            if (typeOf(modelValue, 'array')) {
                return modelValue.map(formatValue)
            }
            return []
        })



        return ({ onUpdate, formatOptions }) => {
            const { onChange }=props
            const _slots = {
                ...slots,
                default: () => {
                    const options = formatOptions?.map(({ value, label, disabled }) => {
                        const _attrs = {
                            value,
                            disabled
                        }
                        return <a-checkbox {..._attrs}>{label}</a-checkbox>
                    })
                    return options?.concat(slots.default?.())
                }
            }
            const _attrs = {
                ...attrs,
                modelValue: modelValue.value,
                'onUpdate:modelValue': onUpdate,
                onChange
            }
            return <a-checkbox-group {..._attrs} v-slots={_slots} />
        }
    }
}