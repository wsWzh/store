import { Pagination as APagination } from "@arco-design/web-vue"


/**
 * 分页组件
 */
export default {
    name: 'MyPagination',
    emits: ['change'],
    props: {
        data: { type: Object, required: true }// 数据源
    },
    setup(props, { attrs, slots, emit }) {

        const onChange = params => {
            emit('change', params)
        }

        return () => {
            const { data } = props

            const { totalRecord, pageNo, pageSize } = data

            const _attrs = {
                class: 'my-pagination',
                total: totalRecord,//数据总数
                current: pageNo,//当前页数
                pageSize,//每页展示的数据条数
                showTotal: true,//显示数据总数
                showPageSize: true,//显示数据条数选择器
                pageSizeOptions: [10, 20, 30, 50, 100],
                onChange: pageNo => onChange({ pageNo, pageSize }),
                onPageSizeChange: pageSize => onChange({ pageSize, pageNo: 1 }),
                ...attrs
            }

            return <APagination  {..._attrs} />
        }
    }
}