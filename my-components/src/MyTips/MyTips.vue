<script lang="jsx">
import {  reactive, watch } from 'vue'
import { empty, typeOf } from '@my-wzh/utils'

/**
 * 通用操作提示
 * 配合子组件的 onError 、 onSuccess 事件提示信息
 */
export default {
    name: 'MyTips',
    emits: ['update:disabled', 'update:visible'],//更新父组件disabled和visible值
    inheritAttrs: false, //不继承父组件的非props属性。
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

        // 同步状态(标识当前按钮为凶手) 凶手组件才会触发 onUpdate:disabled
        watch(() => state.disabled, bool => {
            emit('update:disabled', bool)
        })

        // 提示框显示的时候禁用按钮
        watch(() => state.visible, bool => {
            state.disabled = bool
        })

        // 子组件同步父组件
        const syncDisabled = bool => {
            state.disabled = bool
        }

        const setVisible = (bool, info) => {
            state.visible = bool
            emit('update:visible', bool, info)
        }

        // 提示信息
        const showTips = info => {
            state.message = info.message
            state.backgroundColor = typeOf(info, 'error') ? '#F7676F' : '#25C550'
            return new Promise(resolve => {
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
            //  多个子元素 共用一个disabled
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
                updateAtScroll: true,
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
                        ...btn.props,//注入子组件的props 例如button的type status
                        'onUpdate:loading': syncDisabled,
                        //优先级 mytips的disabled  attrs.btnDisabled自身的disabled  按钮默认的btn.props.disabled
                        // 例子: 元素1 元素2 点击元素1影响不了元素2的state.disabled 但是能影响元素2的btnDisabled 因为他们来源与同一个state
                        disabled: disabled || attrs.btnDisabled || btn.props.disabled,
                        onSuccess,//重写插槽的@success
                        onError,//重写插槽的@error
                    }
                    // 将 tips 状态变化嵌入子组件 覆盖插槽外部props
                    return Object.assign(btn, { props })
                },
            }
            return <a-tooltip {..._attrs} v-slots={_slots} />
        }
    }
}
</script>