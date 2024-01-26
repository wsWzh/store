import { Descriptions, Button, Popover } from 'antd'
import { MyConfirm } from '@/components'
const useResolve = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('操作成功')
        }, 1500)
    })
}

const Test=()=>{
    return <div>
        <MyConfirm onConfirm={useResolve} type="primary" danger Confirm={()=><div>
            123
        </div>}>
           删除
        </MyConfirm>

    </div>
}

export default Test;