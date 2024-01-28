import { Button } from 'antd'

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
    render: ({ record }, { reload }) => <>
      <Button onClick={reload}>刷新</Button>
      <Button onClick={reload}>编辑</Button>
    </>
  }
]