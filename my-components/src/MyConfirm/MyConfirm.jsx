import { ref, reactive, watch } from 'vue'
import { empty } from '@wzh-/utils'
import { MyButton } from '../MyButton'
import { MyTips } from '../MyTips'
import { Popover as APopover, Space as ASpace, Row as ARow, Button as AButton } from '@arco-design/web-vue'


/**
 * 确认操作气泡卡片
 * 一般用于删除等操作
 */
export default {
    name: 'MyConfirm',
    props: {
        title: String,
        onConfirm: Function,
        onCancel: Function,
    },
    emits: ['update:visible'],
    setup(props, { attrs, slots, emit }) {

        const state = reactive({
            visible: false,
            disabled: false
        })

        // 同步外部的visible
        watch(() => state.visible, bool => {
            emit('update:visible', bool)
        })

        const onHide = () => {
            setTimeout(() => state.visible = false)
        }

        const onDisabled = bool => {
            state.disabled = bool
        }

        const setVisible = bool => {
            //执行时禁止改变visible
            if (state.disabled) {
                return
            }
            state.visible = bool
        }

        // 同步tips visible状态 tips关闭时关闭气泡卡片
        const onUpdateVisible = bool =>  state.visible = bool


        return () => {
            const { title, onConfirm = onHide, onCancel = onHide } = props
            const { visible, disabled } = state

            // 预设 confirm cancel 插槽
            // 预设的插槽不添加props arrts属性 因为可能会被自定义插槽覆盖
            const {
                //取消按钮
                cancel = () => [
                    <MyButton type="text" size="small" onClick={onCancel}>取消</MyButton>
                ],
                //确认按钮
                confirm = () => [
                    <MyTips error success>
                        <MyButton type="primary" size="small" onClick={onConfirm}>确定</MyButton>
                    </MyTips>
                ]
            } = slots

            const {
                //预设content插槽
                content = () => {
                    {
                         // 同步按钮禁用状态
                        const btnAttrs = {
                            disabled,
                            'onUpdate:loading': onDisabled,
                        }

                        // 组装功能按钮
                        const content = cancel().concat(confirm()).map(item => {
                            // item.type=>组件的信息 name=>组件的名称
                            if (item.type?.name === 'MyTips') {
                                // 带提示按钮
                                const myBtn = item.children.default().find(btn => btn.type?.name === 'MyButton')
                                if (!empty(myBtn)) {
                                    // 修改 MyTips 组件中的 MyButton 属性
                                    // item是mytips myBtn是tips里的按钮
                                    // Object.assign(myBtn.props, item.props)
                                    // 限制mytips只显示第一个按钮
                                    item.children.default = () => [myBtn]
                                    // 按钮禁用联动
                                    const tipsAttrs = {
                                        btnDisabled: disabled,
                                        'onUpdate:disabled': onDisabled,
                                        'onUpdate:visible': onUpdateVisible,
                                    }
                                    Object.assign(item.props, tipsAttrs)
                                }
                            } else {
                                // 普通按钮
                                Object.assign(item.props, btnAttrs)
                            }
                            return item
                        })
                        // 间距调整
                        const paddingTop = empty(slots.title, props.title) ? 0 : 6 + 'px'
                        //
                        return [
                            <ARow type="flex" justify="end" style={{ paddingTop }} >
                                <ASpace>
                                    {content}
                                </ASpace>
                            </ARow>
                        ]
                    }
                }
            } = slots

            const _attrs = {
                title,
                trigger: 'click',
                popupVisible: visible,
                onPopupVisibleChange: setVisible,
                ...attrs
            }

            const _slots = {
                ...slots,
                default: () => {
                    const btnAttrs = { class: 'my-confirm', disabled, ...attrs }
                    const slotsDefault = slots.default?.()

                    if (empty(slotsDefault)) {
                        return
                    }
                    // 如果插入的是button 同步disabled
                    if (slotsDefault.find(item => {
                        if (['Button', 'MyButton'].includes(item?.type?.name)) {
                            Object.assign(item.props, { disabled }, attrs)
                            return true
                        }
                    })) {
                        return slotsDefault
                    }
                    return <AButton {...btnAttrs} v-slots={slots} />
                },
                content
            }
            return <APopover  {..._attrs} v-slots={_slots} />
        }
    }
}