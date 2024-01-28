import { Button } from 'antd'
import { Link } from "react-router-dom";

export const columns = [
  {
    dataIndex: 'name',
    title: '用户名1',
    width: 200,
  },
  {
    dataIndex: 'name',
    width: 200,
    title: '用户名2',
  },
  {
    dataIndex: 'name',
    title: '用户名3',
    width: 200,
  },
  {
    dataIndex: 'name',
    title: '用户名4',
    width: 200,
  },
  {
    dataIndex: 'name',
    title: '用户名6',
    width: 200,
  },
  {
    title: '操作',
    fixed: 'right',
    width: 150,
    align: 'center',
    slotName: 'actions',
    render: ({ record }, { reload }) => {

      return <>
        <Button onClick={reload}>刷新</Button>
        <Link to='/member/detail'>编辑</Link>
      </>
    }
  }
]