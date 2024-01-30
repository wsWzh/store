import { useNavigate } from 'react-router-dom'
import { MyButton } from '../../components'
import { useAliveController } from 'react-activation'


const Detail = () => {
    const nav = useNavigate()
    const { drop, refresh, dropScope, getCachingNodes } = useAliveController()
    const onBack = () => {
        refresh('MemberList')
        nav(-1)
    }

    return (
        <div>
            用户详情
            <MyButton type="primary" onClick={onBack}>提交</MyButton>
            <MyButton onClick={() => nav(-1)}>返回</MyButton>
        </div>
    )
}

export default Detail;