<script lang="jsx">
import { computed } from 'vue'
import { useRoute } from 'vue-router'


/**
 * 面包屑
 */
export default {
    name: "LayoutCrumb",
    props: {
        slots: { required: true },
        actionSlots: { required: true },
    },
    setup(props, { attrs }) {

        const route = useRoute()

        // 面包屑数据
        const matchedItems = computed(() => {
            const { meta, params, matched } = route
            const routes = matched.filter(({ meta }) => meta?.title)
            // params.matched 和 meta.matched 可对面包屑的数据进行二次改造
            return params.matched?.(routes) || meta.matched?.(routes) || routes
        })

        // 右侧插槽
        const actions = computed(() => {
            const { slots, actionSlots } = props
            const items = actionSlots[route.name] || []
            return items.concat(slots.default?.())
        })

        return () => {

            const items = matchedItems.value
            const len = items.length

            // 面包屑
            const breadcrumbItems = items.map((route, index) => {
                const { title } = route.meta

                if (len > index + 1) {
                    return [
                        <a-breadcrumb-item key={index}>
                            <router-link class="menu-link" to={route}>{title}</router-link>
                        </a-breadcrumb-item>
                    ]
                }
                return <a-breadcrumb-item>{title}</a-breadcrumb-item>
            })

            return [
                <a-row class="my-crumb" justify="space-between" align="center">
                    <a-row>
                        <a-breadcrumb {...attrs}>{breadcrumbItems}</a-breadcrumb>
                    </a-row>
                    <a-row class="action-wrap" justify="end" align="center">{actions.value}</a-row>
                </a-row>
            ]
        }
    }
}
</script>

<style scoped lang="less">
.my-crumb {
    flex-shrink: 0;
    height: 50px;
    padding: 0 20px;
    border-bottom: solid 1px #eee;

    .action-wrap {
        flex: 1;

        > :deep(*+*) {
            margin-left: 10px;
        }
    }

    .menu-link {
        background-color: inherit;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>