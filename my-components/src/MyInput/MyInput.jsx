import { Input as AInput } from '@arco-design/web-vue'
import { empty, typeOf } from '@wzh-/utils'
/**
 * input 添加 pattern 属性
 * 在配置 pattern 正则表达式之后不满足条件的值将返回旧值
 */
export default {
    name: 'MyInput',
    emits: ['update:modelValue'],
    props: {
        modelValue: { type: [String, Number] },
        pattern: RegExp
    },
    setup(props, { attrs, slots, emit }) {
        const doUpdate = value => {
            emit('update:modelValue', value)
        }

        const doUpdateModelValue = value => {
            if (empty(value)) {
                return doUpdate(value)
            }
            const { pattern } = props //通过正则匹配限制正则输入
            if (typeOf(pattern, 'regexp') && !pattern.test(value)) {
                const { modelValue } = props
                return doUpdate(modelValue) //不满足正则不更新值
            }
            doUpdate(value)
        }


        return () => {

            const { modelValue } = props

            const _attrs = {
                ...attrs,
                class: 'my-input',
                modelValue: empty(modelValue) ? '' : String(modelValue),
                'onUpdate:modelValue': doUpdateModelValue
            }

            return <AInput {..._attrs} v-slots={slots} />
        }
    }
}