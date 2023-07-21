<!-- 测试组件的v-model -->
<script lang="jsx">
import { computed } from 'vue'

export default {
    name: 'testModelValue',
    emits: ['update:loading','update:modelValue'],
    props: {
        modelValue: String
    },
    setup(props, { attrs, slots, emit }) {

        const inputValue = computed(() => {
            const { modelValue } = props
            return modelValue?.includes('我是计算属性')? modelValue: modelValue + '我是计算属性'
        })

        const onUpdate = (value) => {
            emit('update:modelValue', value)
        }

        const onChange=(value)=>{
            console.log(value,'change');
        }

        return () => {

            const fn = () => {
                emit('update:loading', true)
                setTimeout(() => {
                    emit('update:loading', false)
                }, 2000)
            }

            const _attrs = {
                ...attrs
            }

            const inputAttrs = {
                modelValue: inputValue.value,
                'onUpdate:modelValue': onUpdate,
                onChange
            }

            return <a-space>
                <a-button {..._attrs} onClick={fn}>加载</a-button>
                <a-input {...inputAttrs}></a-input>
            </a-space>

        }
    }
}
</script>