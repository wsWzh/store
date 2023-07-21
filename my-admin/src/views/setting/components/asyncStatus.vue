
<script lang="jsx">
import { ref, watch } from 'vue'
export default {
    name: 'asyncStatus',
    emits: ['update:disabled',],
    props: {},
    setup(props, { attrs, slots, emit }) {

        const disabled = ref(false)

        const setDisabled = (loading) => {
            disabled.value = loading
        }

        watch(disabled, value => {
            emit('update:disabled', value)
        })

        const setOtherDisabled = (value,item) => {
            console.log('谁触发了',item.children.default()[0].children);
            disabled.value = value
        }

        return () => {
            let items = slots.default?.()

            if (items.length === 0) {
                return []
            }
            if (items.length > 1) {
                const children = items.map(item => {

                    const _arrts = {
                        'onUpdate:disabled':(value)=> setOtherDisabled(value,item),
                        otherdisabled: disabled.value
                    }

                    const aslots = {
                        default: () => item
                    }
                    return <asyncStatus {..._arrts} v-slots={aslots}></asyncStatus>
                })
                return <a-space>{children}</a-space>
            }


            const _slots = {

                default: () => {
                    const btn = items.find(item => item.props)
                    if (!btn) {
                        return items
                    }
                    const props = {
                        ...btn.props,
                        "onUpdate:loading": setDisabled,
                        disabled: disabled.value || attrs.otherdisabled
                    }
                    console.log(attrs.otherdisabled,disabled.value);
                    console.log(btn.children.default()[0].children, 123);
                    return Object.assign(btn, { props })
                }
            }

            return <a-space v-slots={_slots}></a-space>
        }
    }
}
</script>