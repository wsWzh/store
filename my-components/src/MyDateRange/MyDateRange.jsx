import { RangePicker as ARangePicker } from '@arco-design/web-vue'
import { empty } from "@wzh-/utils"

/**
 * 日期范围选择
 * props.end 接收结束时间
 * props.start 接收开始时间
 */
export default {
    name: 'MyDateRange',
    emits: ['update:end', 'update:start'],
    props: {
        end: String,
        start: String
    },
    setup(props, { attrs, slots, emit }) {

        const doUpdate = (items) => {
            emit('update:start', items[0])
            emit('update:end', items[1])
        }

        return () => {
            const { start, end } = props

            const _attrs = {
                class: 'my-date-range',
                modelValue: [start, end].filter(v => !empty(v)),
                'onUpdate:modelValue': doUpdate
            }

            return <ARangePicker {..._attrs} v-slots={slots} />

        }
    }
}