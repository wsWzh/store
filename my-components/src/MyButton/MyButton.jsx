import { ref, watch, computed } from 'vue'
import { typeOf } from '@wzh-/utils'
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
    },
    setup(props, { attrs, slots, emit }) {

        const loading = ref(false)

        const useLoading = () => {
            loading.value = true
            return () => (loading.value = false)
        }

        // 同步父组件状态
        watch(loading, bool => {
            emit('update:loading', bool)
        })

        // 按钮单击
        const onClick = (...args) => {
            const click = props.onClick
            // 触发器组件会默认给插槽添加click事件 如果在插槽也注册了点击事件会合并成数组
            const promise = (click[0] || click)(...args) // 执行函数
            // 如果返回promise
            if (typeOf(promise, 'promise')) {
                promise
                    .then(res => emit('success', res))
                    .catch(error => emit('error', error))
                    .finally(useLoading())
            }
        }

        return () => {
            const _attrs = {
                class: 'my-button',
                loading: loading.value,
                disabled: loading.value ? true : attrs.disabled,
                onClick
            }


            return <AButton {..._attrs} v-slots={slots} />

        }
    }
}