export const columns = [
  {
    dataIndex: 'name',
    title: '用户名1',
    width: 200,
    fixed: 'left',
    slots: {
      header({ $index , _self , column , store }) {
        return '哈哈'
      },
      default() {
        return <span>123</span>
      }
    }
  },
  {
    title: '全选',
    dataIndex: 'ab',
    type: 'selection',
    fixed: 'left',
    width: 60,
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
    width: 100,
    align: 'center',
    slotName : 'actions' ,
  }
]