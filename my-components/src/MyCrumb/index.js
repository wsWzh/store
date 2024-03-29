import Crumb from './MyCrumb.vue'
import router from '@/router'
import { h, reactive } from 'vue'

// 插槽数据
export const actionSlots = reactive({
    // [route.name] : slots[]
})

const MyCrumb = (props, { slots }) => {
    return h(Crumb, { slots, actionSlots })
}

// 面包屑插槽（用于给面包屑传递插槽）
const MyCrumbSlot = {
    name: 'MyCrumbSlot',
    setup: (props, { slots }) => {
        const { name } = router.currentRoute.value
        return () => {
            actionSlots[name] = slots.default()
        }
    }
}

export { MyCrumbSlot, MyCrumb }