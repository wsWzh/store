import { useNavigate } from 'react-router-dom'
import { MyButton } from '../../components'

const Detail = () => {
    const nav = useNavigate()
    return (
        <div>
            用户详情
            <MyButton onClick={()=>nav(-1)}>返回</MyButton>
        </div>
    )
}

export default Detail;