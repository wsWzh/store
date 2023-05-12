
<script lang="jsx">
import { typeOf } from '@wangzhengheng/utils'
import { ref, watch } from 'vue'
/**
 * my-button 添加了 loading
 * loading : onClick 事件返回的是一个 promise 时自动触发 loading 效果
 * success error 配合my-tips提示
 */
export default {
    name: 'MyButton',
    emits: ['update:loading', 'success', 'error'],
    props: {
        onClick: { type: [Function, Array], default: () => () => 0 },
        disabled: Boolean,
    },
    setup(props, { slots, emit }) {
        const loading = ref(false)
        const useLoading = () => {
            loading.value = true
            return () => {
                loading.value = false
            }
        }
        //同步状态
        watch(loading, bool => {
            emit('update:loading', bool)
        })
        // 按钮单击
        const onClick = (...args) => {
            const click = props.onClick
            const promise = (click[0] || click)(...args)
            // 返回值是 promise 时同步按钮状态
            if (typeOf(promise, 'promise')) {
                const closeLoading = useLoading()
                promise.then(res => emit('success', res)).catch(error => emit('error', error)).finally(closeLoading)
            }
        }

        return () => {

            const attrs = {
                class: 'my-button',
                loading: loading.value,
                disabled: loading.value ? false : props.disabled,
                onClick,
            }

            return <a-button {...attrs} v-slots={slots} />
        }
    }
}
</script>
