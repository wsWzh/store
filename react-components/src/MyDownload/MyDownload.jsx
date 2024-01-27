import { empty, typeOf } from "@wzh-/utils"
import { MyButton } from "../MyButton"

/**
 * 下载按钮
 * 通过触发MyButton的onSuccess
 */
const MyDownload = (props) => {

    const { onSuccess: tipsOnSuccess, onError: tipsonError, } = props

    const onDownload = (url, fileName) => {
        const a = document.createElement('a');
        const el = document.body.appendChild(a);
        el.style.cssText = "position:absolute;z-index:-1;opacity:0";
        el.download = decodeURIComponent(fileName)//文件名
        el.target = '_blank'//新的窗口中打开
        el.href = url
        // 触发下载
        el.click()
        // 删除a标签
        el.parentNode.removeChild(el);
    }

    const onSuccess = response => {
        if (empty(response)) {
            return console.log('MyDownload.onSuccess : response is null')
        }
        const { data, headers } = response
        if (typeOf(data, 'blob')) {

            const type = headers['content-type']

            const fileName = headers['content-disposition']?.split('=')[1] || '神秘文件'

            const blob = new Blob([data], [type])

            const url = URL.createObjectURL(blob)
            onDownload(url, fileName)

        } else {
            //异步下载
            const fileName = response.fileName || response?.result?.fileName
            const url = response.url || response?.result?.url
            if (fileName && url) {
                onDownload(url, fileName)
            }
        }
        tipsOnSuccess && tipsOnSuccess('操作成功')
    }

    const onError = error => {
        tipsonError && tipsonError(error)
        console.log('MyDownload.onError', error);
    }


    const _props = {
        ...props,
        onSuccess,
        onError
    }
    return <MyButton {..._props} />
}

export default MyDownload