import { Descriptions, Button, Popover, Form, Upload } from 'antd'
import { MyUpload, MyDownload, MyTips  } from '@/components'
import { GET_DOWNLOAD, http } from '../../http'

const useResolve = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('操作成功')
        }, 1500)
    })
}

const handleDownload = () => {
    return http({ url: GET_DOWNLOAD, responseType: 'blob', intact: true })
}


const Test = () => {
    return <div className='outlet-main'>
        <MyTips success error>
            <MyDownload onClick={handleDownload}>下载</MyDownload>
        </MyTips>
        <MyTips success error>
            <MyUpload action={useResolve} origin="https://static-nk.liux.co" maxCount={3} BtnSlot={<Button type="primary">上传</Button>}>
        </MyUpload>
            <Upload>
                <Button >Upload</Button>
            </Upload>
        </MyTips>

    </div>
}

export default Test;