import { ref, reactive, watch } from 'vue'
import { empty } from '@my-wzh/utils'
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

        watch(() => state.visible, bool => {
            emit('update:visible', bool)
        })

        const onHide = () => {
            setTimeout(() => state.visible = false)
        }

        const onDisabled = bool => state.disabled = bool

        const setVisible = bool => {
            //disabled时禁止改变visible
            if (!state.disabled) {
                state.visible = bool
            }
        }

        const onUpdateVisible = bool => state.visible = bool

        return () => {
            const { title, onConfirm = onHide, onCancel = onHide } = props
            const { visible, disabled } = state

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
                //预设插槽
                content = () => {
                    {
                         // 同步按钮禁用状态
                        const btnAttrs = {
                            disabled,
                            'onUpdate:loading': onDisabled,
                        }
                        // 组装功能按钮
                        const content = cancel().concat(confirm()).map(item => {
                            if (item.type?.name === 'MyTips') {
                                // 带提示按钮
                                const myBtn = item.children.default().find(item => item.type?.name === 'MyButton')
                                if (!empty(myBtn)) {
                                    // 修改 MyTips 组件中的 MyButton 属性
                                    Object.assign(myBtn.props, item.props)
                                    item.children.default = () => [myBtn]
                                    // 按钮禁用联动
                                    const tipsAttrs = {
                                        inheritDisabled: disabled,
                                        'onUpdate:disabled': onDisabled,
                                        'onUpdate:visible': onUpdateVisible,
                                    }
                                    Object.assign(item.props, tipsAttrs, item.props)
                                }
                            } else {
                                // 普通按钮
                                Object.assign(item.props, btnAttrs, item.props)
                            }
                            return item
                        })
                        // 间距调整
                        const paddingTop = empty(slots.title, attrs.title) ? 0 : 6 + 'px'
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
                    if (slotsDefault.find(item => {
                        if (['Button', 'MyButton'].includes(item?.type?.name)) {
                            const props = { ...item.props }
                            Object.assign(props, { disabled }, item?.props, attrs)

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