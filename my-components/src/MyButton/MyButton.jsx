import { ref, watch, computed, toRefs } from 'vue'
import { typeOf } from '@my-wzh/utils'
import { Button as AButton } from '@arco-design/web-vue'
/**
 * my-button 添加了 loading
 * loading : onClick 事件返回的是一个 promise 时自动触发 loading 效果
 * success ,error 配合MyTips提示
 */
export default {
    name: 'MyButton',
    emits: ['update:loading', 'success', 'error'],
    props: {
        onClick: { type: [Function, Array], default: () => () => 0 },
        disabled: Boolean,
        loadingText: { type: String, default: '正在处理' }
    },
    setup(props, { attrs, slots, emit }) {
        const loading = ref(false)
        const useLoading = () => {
            loading.value = true
            return () => (loading.value = false)
        }
        // 同步状态
        watch(loading, bool => {
            emit('update:loading', bool)
        })
        // 按钮单击
        const onClick = (...args) => {
            const click = props.onClick
            const promise = (click[0] || click)(...args) // 执行函数
            // 如果返回promise
            if (typeOf(promise, 'promise')) {
                const closeLoading = useLoading()
                promise
                    .then(res => emit('success', res))
                    .catch(error => emit('error', error))
                    .finally(closeLoading)
            }
        }
        // 按钮文字
        const buttonText = computed(() => {
            if (loading.value) {
                return props.loadingText
            } else {
                return slots.default()[0].children
            }
        })
        return () => {
            const { value: loadingValue } = toRefs(loading)
            const _attrs = {
                class: 'my-button',
                loading: loadingValue,
                disabled: loadingValue ? true : attrs.disabled,
                onClick
            }
            const _slots = {
                ...slots,
                default: () => buttonText.value
            }
            return (
                <AButton v-bind={_attrs} v-slots={_slots} />
            )
        }
    }
}