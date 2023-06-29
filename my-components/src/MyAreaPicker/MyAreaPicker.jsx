import options from './options'
import { empty } from '@my-wzh/utils'

export default {
    name: 'MyAreaPicker',
    emits: ['update:modelValue', 'change'],
    props: { modelValue: { type: [Number, String], default: '' } },
    setup(props, { attrs, slots, emit }) {


        const getLabel = (items, code) => {
            const item = items?.find(({ value }) => {
                return code.indexOf(value) === 0
            })
            return empty(item) ? [] : [item].concat(getLabel(item.children, code))
        }

        const onChange = (code) => {
            const label = getLabel(options, code)
            emit('change', label)
        }
        return () => {

            const { modelValue } = props

            const _attrs = {
                ...attrs,
                options,
                placeholder: '请选择地址',
                modelValue: String(modelValue),
                'onUpdate:modelValue': v => emit('update:modelValue', v),
                onChange
            }
            return  <a-cascader {..._attrs} v-slots={slots} />
        }
    }
}