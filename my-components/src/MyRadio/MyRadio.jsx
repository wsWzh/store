import { Radio as ARadio } from "@arco-design/web-vue"
import mixin from '../_mixins/options'
/**
 * 单选框
 * 添加 props.options 作为选项数据
 * 通过设置 props.formatter 指定真实值和显示值
 */
export default {
    name: 'MyRadio',
    mixins: [mixin],
    emits: [],
    props: {},
    setup(props, { attrs, slots, emit }) {
        return ({ modelValue, onUpdate, onChange, formatOptions }) => {

            const _attrs = {
                class: 'my-radio',
                modelValue: (modelValue),
                'onUpdate:modelValue': onUpdate,
                ...attrs
            }

            const _slots = {
                ...slots,
                default: () => {
                    const options = formatOptions.map(({ value, label, disabled }) => {
                        const _attrs = { value, disabled }
                        return <ARadio {..._attrs}>{label}</ARadio>
                    })
                    return options.concat(slots.default?.())
                }
            }

            return <ARadioGroup {..._attrs} v-slots={_slots} />
        }
    }
}