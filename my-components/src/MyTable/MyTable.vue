<script lang="jsx">
import MyPagination from './MyPagination'
import { Row as ARow, Table as ATable, Spin as ASpin, Space as ASpace } from '@arco-design/web-vue'
import { ref, watch, reactive, onMounted, computed, toRaw } from 'vue'
import { reduceProps, empty, typeOf } from '@my-wzh/utils'
import { stringify } from '../_utils/index'

/**
 * 表格组件
 * props.onRequest 数据源
 * props.columns 列表配置
 * props.selections? 复选框
 * props.history? 值为真时，利用 url 记录当前查询的条件和分页（暂时只支持哈希路由）
 * props.load? 值为真时组件载入后发送请求
 * props.bordered? 是否显示边框（默认否）
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
    },
    setup(props, { attrs, slots, emit, expose }) {

        const loading = ref(false)//表格loading

        const useLoading = () => {
            loading.value = true
            return () => {
                loading.value = false
            }
        }

        // 将 loading 同步到父组件
        watch(loading, bool => emit('update:loading', bool))

        // 获取 url中的参数 location.hash => #/member 获取#之后的值 decodeURIComponent  特殊字符=>原始字符
        const query = /\?(.+)$/.exec(location.hash)?.[1].split('&').reduce((_, str) => {
            const vs = str.split('=')
            if (empty(vs) || empty(vs[1])) {
                return _
            }
            return { ..._, [vs[0]]: decodeURIComponent(vs[1]) }
        }, {})

        // 查询条件 去掉分页的参数
        const params = reactive(reduceProps(query, ({ key }) => ['pageNo', 'pageSize'].includes(key)))

        const paramsHistory = ref({})

        watch(paramsHistory, value => {
            if (!props.history) {
                return
            }
            const query = reduceProps(value, ({ value }) => empty(value))
            if (value?.pageNo === 1) delete query.pageNo // 删减非必要参数
            if (value?.pageSize === 10) delete query.pageSize // 删减非必要参数
            let url = location.hash.split('?')[0]
            if (!empty(query)) {
                url += `?${stringify(query)}`
            }
            //更新浏览器的历史记录，并修改当前 URL 的路径
            history.replaceState(history.state, '', url)//这样做可以更新浏览器的地址栏 URL，但不会导致页面的刷新或重新加载。
            emit('update:history', query)
        })

        // 接口返回数据 包含分页参数
        const dataInfo = ref()

        watch(dataInfo, value => emit('change', value, params))

        // 列表数据
        const dataList = computed(() => dataInfo.value?.results || [])

        //勾选的数据的rowkey数组
        const selectedKeys = computed(() => props.selections?.map?.(item => item[props.rowKey]))

        // 复选框变更时返回选中的数据对象 concat保证了不会丢失不是当前页的选项
        const doSelectedKeysChange = keyItems => {
            const { selections, rowKey } = props
            const selectedRows = keyItems.map(key => toRaw(selections.concat(dataList.value).find(item => item[rowKey] === key)))
            emit('update:selections', selectedRows)
        }

        //查询
        const search = async _params => {
            let pageNo = empty(dataInfo.value) ? query?.pageNo || 1 : 1
            let pageSize = empty(dataInfo.value) ? query?.pageSize || 10 : dataInfo.value.pageSize
            //重置时清空查询条件
            if (_params === null) {
                reduceProps(params, ({ key }) => delete params[key])
            }
            // 非正常参数
            if (!typeOf(_params, 'object')) {
                _params = {}
            }
            //记录参数
            paramsHistory.value = { pageNo, pageSize, ...params, ..._params }
            dataInfo.value = await props.onRequest(params).finally(useLoading())
        }

        // 刷新数据
        const reload = () => {
            const pageNo = dataInfo.value?.pageNo //当前页码
            const pageSize = dataInfo.value?.pageSize //当前每页展示的数据条数
            return search({ pageNo, pageSize })
        }


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

            //预设插槽
            const {
                empty: slotEmpty = () => [
                    <ARow class="empty-wrap" justify="center" align="center">{loading.value ? '加载中...' : '暂无数据'}</ARow>
                ],
                // 查询条件
                params: slotParams = () => [],
                // 分页条
                pagination: slotPagination = () => {
                    if (empty(dataInfo.value)) {
                        return []
                    }
                    return [
                        <MyPagination {...{ disabled: loading.value, data: dataInfo.value, onChange: search }} />
                    ]
                },
            } = slots


            const tabelAttrs = {
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
                const selectAttrs = {
                    rowSelection: {
                        width: 60,
                        type: 'checkbox',
                        showCheckedAll: true,
                        ...attrs.rowSelection
                    },
                    selectedKeys: selectedKeys.value,
                    'onUpdate:selectedKeys': doSelectedKeysChange
                }
                Object.assign(tabelAttrs, selectAttrs)
            }

            const tableSlots = {
                ...slots,
                empty: () => slotEmpty({ loading: loading.value })
            }

            const Table = <ATable {...tabelAttrs} v-slots={tableSlots} />

            return slotParams({ params, search }).concat([Table]).concat([slotPagination()])
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