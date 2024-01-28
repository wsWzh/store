import { Pagination } from 'antd';

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',

}

const MyPagination = (props) => {

    const { data, search } = props
    const { totalRecord: total, pageNo: current, pageSize } = data

    const onChange = (pageNo, pageSize) => {
        search({ pageNo, pageSize })
    }

    const _props = {
        pageSizeOptions: [10, 20, , 30, 50, 100],
        total,
        current,
        pageSize,
        onChange,
        showSizeChanger: true,
        showTotal: (total, range) => `共${total}条`,
        style,
        ...props,
    }

    return <Pagination {..._props} />

}

export default MyPagination