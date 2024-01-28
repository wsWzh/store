<script lang="jsx">
import MyPagination from './MyPagination'
import { Row as ARow, Table as ATable, Button as Abutton, Space as Aspace } from '@arco-design/web-vue'
import { ref, watch, reactive, onMounted, computed, toRaw } from 'vue'
import { reduceProps, empty, typeOf } from '@wzh-/utils'
import router from '@/router'

/**
 * 表格组件
 * props.onRequest 数据源
 * props.columns 列表配置
 * props.selections? 复选框
 * props.history? 值为真时，利用 url 记录当前查询的条件和分页（暂时只支持哈希路由）
 * props.load? 值为真时组件载入后发送请求
 * props.bordered? 是否显示边框（默认否）
 * props.rowSelection? 表格的行选择器配置
 * slots.params? 参数插槽，提供参数：{ params , search }
 * slots.pagination? 自定义分页区插槽，提供参数：{ dataInfo , search }
 */
export default {
    name: 'MyTable',
    emits: ['update:loading', 'change', 'update:selections', 'update:history'],
    props: {
        onRequest: { type: Function, require: true },//数据源
        selections: [Boolean, Array], // 复选框
        columns: { type: Array, required: true },
        load: { type: Boolean, default: true }, // 值为真时加载完组件马上获取数据
        rowKey: { default: 'id' }, // 预设 key = id
        history: Boolean, // 值为真时路由会记录
        bordered: { type: [Boolean, Object], default: false },
        rowSelection: { type: Object, default: () => ({}) },
    },
    // expose相当于defineExpose
    setup(props, { attrs, slots, emit, expose }) {
        const loading = ref(false)//表格loading

        const useLoading = () => {
            loading.value = true
            return () => loading.value = false
        }

        // 将 loading 同步到父组件
        watch(loading, bool => emit('update:loading', bool))

        // 进入页面,获取url中的参数
        // location.hash => #/member 获取#之后的值 decodeURIComponent  特殊字符=>原始字符
        const query = /\?(.+)$/.exec(location.hash)?.[1].split('&').reduce((_, str) => {
            const vs = str.split('=')
            const key = vs[0], value = vs[1]
            if (empty(vs) || empty(value)) {
                return _
            }
            return { ..._, [key]: decodeURIComponent(value) }
        }, {})

        // 查询条件
        const params = reactive({})
        // history时将url的除了分页的参数合并到params
        if (props.history) {
            Object.assign(params, reduceProps(query, ({ name }) => ['pageNo', 'pageSize'].includes(name)))
        }

        // 保存查询时使用的参数
        const paramsHistory = ref({})

        // props.history = true 时，通过 url 记录当前参数
        watch(paramsHistory, value => {
            if (!props.history) {
                return
            }
            const query = reduceProps(value, ({ value }) => empty(value))//删减空参数
            if (value?.pageNo === 1) delete query.pageNo // 删减非必要参数
            if (value?.pageSize === 10) delete query.pageSize // 删减非必要参数
            const { name } = router.currentRoute.value
            router.replace({ name, query })
            emit('update:history', query)
        })

        // 接口返回数据 包含分页参数
        const dataInfo = reactive({})

        watch(dataInfo, value => emit('change', value, params))

        // 列表数据
        const dataList = computed(() => dataInfo.results || [])

        //勾选的数据的rowkey数组 items=>item[rowKey] 用于回显表格的勾选
        const selectedKeys = computed(() => {
            const { selections, rowKey } = props
            return selections?.map?.(item => item[rowKey])
        })

        // 复选框变更时返回选中的数据对象 concat保证了不会丢失不是当前页的选项
        const doSelectedKeysChange = keyItems => {
            const { selections, rowKey } = props
            const selectedRows = keyItems.map(key => toRaw(selections.concat(dataList.value).find(item => item[rowKey] === key)))
            emit('update:selections', selectedRows)
        }

        const searchErr = ref(false)

        //查询
        const search = async _params => {
            searchErr.value = false
            //重置时清空查询条件
            if (_params === null) {
                // 不能直接赋值 reactive会丢失响应性
                reduceProps(params, ({ key }) => delete params[key])
            }
            // 非正常参数
            if (!typeOf(_params, 'object')) {
                _params = {}
            }
            //记录参数
            paramsHistory.value = { ...params, ..._params }
            const res = await props.onRequest(paramsHistory.value).catch(err => searchErr.value = true).finally(useLoading())
            Object.assign(dataInfo, res)
        }

        // 刷新数据
        const reload = () => {
            const pageNo = dataInfo.pageNo //当前页码
            const pageSize = dataInfo.pageSize //当前每页展示的数据条数
            return search({ pageNo, pageSize })
        }

        //导出方法
        expose({ search, reload })

        // 挂载后执行搜索
        onMounted(() => props.load && search())


        return () => {

            const { rowKey, selections, columns, bordered } = props

            // 重写render 将reload(刷新数据)注入render
            columns.map(item => {
                const fn = item.render
                if (!empty(fn)) {
                    item.render = rowInfo => fn(rowInfo, { reload })
                }
            })

            const slotErr = () => [
                <ARow class="empty-wrap" justify="center" align="center">
                    <Aspace>
                        <div>请求错误</div>
                        <Abutton type='text' onClick={search}>重试</Abutton>
                    </Aspace>
                </ARow>
            ]

            //预设插槽
            const {
                empty: slotEmpty = () => [
                    <ARow class="empty-wrap" justify="center" align="center">{loading.value ? '加载中...' : '暂无数据'}</ARow>
                ],
                // 查询条件
                params: slotParams = () => [],
                // 分页组件
                pagination: slotPagination = () => {
                    if (empty(dataInfo)) {
                        return []
                    }
                    const paginationAttrs = { disabled: loading.value, data: dataInfo, onChange: search }
                    return [<MyPagination {...paginationAttrs} />]

                },
            } = slots

            const tableAttrs = {
                class: 'my-table',
                scroll: { x: '100%', y: '100%' },
                pagination: false,
                data: dataList.value,
                rowKey,
                loading: loading.value,
                columns,
                bordered,
                ...attrs,
            }

            // 当配置了 selections 时，添加复选框关联配置
            if (typeOf(selections, 'array')) {
                const { rowSelection } = props
                const selectAttrs = {
                    rowSelection: {
                        width: 60,
                        type: 'checkbox',
                        showCheckedAll: true,
                        ...rowSelection
                    },
                    selectedKeys: selectedKeys.value,
                    'onUpdate:selectedKeys': doSelectedKeysChange
                }
                Object.assign(tableAttrs, selectAttrs)
            }

            const tableSlots = {
                ...slots,
                empty: () => searchErr.value ? slotErr() : slotEmpty({ loading: loading.value })
            }
            const Table = <ATable {...tableAttrs} v-slots={tableSlots} />

            return [
                ...slotParams({ params, search, loading: loading.value }),
                Table,
                ...slotPagination(dataInfo)
            ]
        }
    }
}

</script>
<style scoped lang="less">
.my-table {
    flex: 1;
    overflow: hidden;

    :deep(.arco-table-container) {
        height: 100%;

        .arco-scrollbar-type-embed:last-child {
            flex: 1;

            .arco-table-tr-empty>td {
                border: unset;

                .empty-wrap {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    color: #888;
                }
            }
        }
    }

    &+.my-pagination {
        margin: 20px auto 0;
    }
}
</style>