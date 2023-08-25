import { Switch as ASwitch } from "@arco-design/web-vue"
import { ref, watch } from 'vue'
import { empty, typeOf } from '@my-wzh/utils'
/**
 * 开关组件
 * props.checkedValue 添加默认值 1
 * props.uncheckedValue 添加默认值 0
 * 添加 loading 响应 onChange 事件
 */
export default {
    name: 'MySwitch',
    emits: ['update:loading', 'update:modelValue', 'success', 'error'],
    props: {
        checkedValue: { type: [Boolean, String, Number], default: 1 },
        uncheckedValue: { type: [Boolean, String, Number], default: 0 },
        onChange: { type: Function, default: () => { } }//状态变更
    },
    setup(props, { attrs, slots, emit }) {

        const loading = ref(false)

        watch(loading, bool => emit('update:loading', bool))

        const showLoading = () => {
            loading.value = true
            return () => loading.value = false
        }

        // 通过重写update:modelValue 延迟swicth的值改变
        const onUpdate = async (value) => {
            const { uncheckedValue, checkedValue } = props
            if (![uncheckedValue, checkedValue].includes(value)) {
                return
            }
            const response = props.onChange(value)
            if (typeOf(response, 'promise')) {
                await response.then(res => {
                    emit('success', res)
                }).catch(error => {
                    emit('error', error)
                    // catch时return 防止修改modelvalue
                    return Promise.reject(error)
                }).finally(showLoading())
            }
            emit('update:modelValue', value)
        }


        //默认值设置为uncheckedValue
        if (empty(attrs.modelValue)) {
            emit('update:modelValue', props.uncheckedValue)
        }

        return () => {
            const { checkedValue, uncheckedValue } = props
            const _attrs = {
                class: 'my-switch',
                loading: loading.value,
                checkedValue,
                uncheckedValue,
                'onUpdate:modelValue': onUpdate,
                ...attrs,
            }

            return <ASwitch {..._attrs} v-slots={slots} />
        }
    }
}