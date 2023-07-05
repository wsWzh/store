import { Select as ASelect ,Option as AOption} from "@arco-design/web-vue"
import mixin from '../_mixins/options'
import { computed } from 'vue'
import { empty, typeOf } from '@my-wzh/utils'
import { formatValue } from '../_utils'

export default {
    name: 'MySelect',
    emits: [],
    mixins: [mixin],
    props: {
        placeholder: { type: String, default: '请选择' },
        multiple: Boolean
    },
    setup(props, { attrs, slots, emit }) {

        const modelValue = computed(() => {

            const { modelValue, multiple, options } = props
            //没有选项时不做预设填充
            if (empty(modelValue) || empty(options, slots.default)) {
                return multiple ? [] : undefined
            }
            // 多选
            if (multiple) {
                if (empty(modelValue)) {
                    return []
                }
                if (typeOf(modelValue, 'number')) {
                    return [formatValue(modelValue)]
                } if (typeOf(modelValue, 'string')) {
                    return modelValue.split(',').map(formatValue)
                }
                return modelValue
            }
            //单选
            return formatValue(modelValue)
        })
        return ({ formatOptions, onUpdate, onChange }) => {

            const { placeholder, multiple } = props
            const _attrs = {
                class: 'my-select',
                placeholder,
                options: formatOptions,
                multiple,
                modelValue: modelValue.value,
                'onUpdate:modelValue': onUpdate,
                onChange: value => {
                    if (typeOf(value, 'array')) {
                        //多选 返回数组
                        value = formatOptions.filter(item => value.includes(item.value))
                    } else {
                        //单选
                        value = formatOptions.find(item => value === item.value)
                    }
                    onChange(value)
                },
                ...attrs,
            }

            const _slots={
                ...slots,
               default:()=>{
                    const options = formatOptions.map(({value,label,disabled})=>{
                        const optionAttrs = { value, label, disabled }
                        return <AOption {...optionAttrs}/>
                    })
                    return options.concat(slots.default?.())
               }
            }
            console.log(_slots.default());
            return <ASelect {..._attrs} v-slots={_slots} />
        }
    }
}