<script lang="jsx">
import {  reactive, watch } from 'vue'
import { empty, typeOf } from '@my-wzh/utils'

/**
 * 通用操作提示
 * 配合子组件的 onError 、 onSuccess 事件提示信息
 */
export default {
    name: 'MyTips',
    //更新父组件disabled和visible值
    emits: ['update:disabled', 'update:visible'],
    //不继承父组件的非props属性。
    inheritAttrs: false,
    props: {
        delay: { type: Number, default: 1500 }, // 信息窗停留时间
        success: [Boolean, String], // 开/关 成功提示 (字符串时替换提示信息)
        error: [Boolean, String], // 开/关 错误提示 (字符串时替换提示信息)
    },
    setup(props, { attrs, slots, emit }) {

        const state = reactive({
            disabled: false,
            visible: false,
            message: '', // 提示信息
            backgroundColor: '', // 提示窗口的背景色
        })

        // 同步状态(标识凶手) watch触发emit是因为disabled的值会被多种情况改变
        watch(() => state.disabled, bool => {
            emit('update:disabled', bool)
        })

        // 提示框显示的时候禁用按钮
        watch(() => state.visible, bool => {
            state.disabled = bool
        })

        // 按钮disabled同步到my-tips
        const syncDisabled = bool => {
            state.disabled = bool
        }

        // visible的值只会在setVisible改变 直接emit
        const setVisible = (bool, info) => {
            state.visible = bool
            emit('update:visible', bool, info)
        }

        // 提示信息
        const showTips = info => {
            state.message = info.message
            state.backgroundColor = typeOf(info, 'error') ? '#F7676F' : '#25C550'
            return new Promise(resolve => {
                // 如果在同一次事件循环中改变visible的值，可能会导致提示框的位置计算错误，从而导致提示框显示在错误的位置。
                // 通过使用setTimeout，可以将改变visible的操作推迟到下一次事件循环，这样就可以避免这个问题了。
                setTimeout(() => setVisible(true, info)) // setTimeout 规避提示框错位
                setTimeout(() => resolve(setVisible(false, info)), props.delay)
            })
        }

        // 处理成功提示
        const onSuccess = async res => {
            const { success } = props
            if (success === false) {
                return setVisible(false, res)
            }
            let message = res?.message || '操作成功'
            if (typeOf(success, 'string')) {
                message = success
            }
            await showTips({ message })
        }

        // 处理错误提示
        const onError = async res => {
            const { error } = props
            if (error === false) {
                return setVisible(false, res)
            }
            let message = res.message || '操作失败'
            if (typeOf(error, 'string')) {
                message = error
            }
            //new Error(message)错误对象
            await showTips(new Error(message))
        }

        return () => {

            const { visible, disabled, backgroundColor } = state

            // 获取插槽中的子组件
            let items = slots.default?.()

            // 空插槽
            if (empty(items)) {
                return []
            }
            //  多个子元素的btnDisabled共用一个disabled
            // 流程:按钮1点击触发按钮的onUpdate:loading 改变当前mytips的disabled => watch disabled 触发my-tips的onUpdate:disabled改变按钮1和按钮2的btndisabled
            //     <my-tips>1</my-tips>
            //     <my-tips>2</my-tips>
            if (items.length > 1) {
                // 给每个元素套上my-yips 添加 btnDisabled 属性 用于控制多个子元素同时disabled
                const children = items.map(item => {
                    const _attrs = { btnDisabled: disabled, 'onUpdate:disabled': syncDisabled, ...props, ...attrs }
                    const _slots = { default: () => item }
                    return <MyTips {..._attrs} v-slots={_slots} />
                })
                return <a-space>{children}</a-space>
            }

            // 单个元素
            // my-tips
            const _attrs = {
                popperClass: 'my-tips',
                popupVisible: visible,
                updateAtScroll: true,// 是否在容器滚动时更新弹出框的位置
                backgroundColor,
                ...attrs,
            }

            const _slots = {
                // 泡泡弹窗提内容
                content: () => state.message,
                // 子组件
                default: () => {
                    //找到props不是空的元素
                    const btn = items.find(({ props }) => !empty(props))
                    if (empty(btn)) {
                        return items
                    }
                    const props = {
                        //注入子组件的props 例如button的type status
                        ...btn.props,
                        'onUpdate:loading': syncDisabled,
                        //优先级 mytips的disabled  attrs.btnDisabled自身的disabled  按钮默认的btn.props.disabled
                        // 例子: 元素1 元素2 点击元素1影响不了元素2的state.disabled 但是能影响元素2的btnDisabled 因为他们来源与同一个state
                        // 为什么是btn.props 不通过setup({props,attrs})是拿不到attrs的 此时arrts和props是合并的
                        disabled: disabled || attrs.btnDisabled || btn.props.disabled,
                        onSuccess,//重写插槽的@success
                        onError,//重写插槽的@error
                    }
                    // 将 tips 状态变化嵌入子组件 覆盖外部插槽props
                    return Object.assign(btn, { props })
                },
            }

            return <a-tooltip {..._attrs} v-slots={_slots} />
        }
    }
}
</script>