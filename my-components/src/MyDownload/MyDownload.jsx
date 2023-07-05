import { MyButton } from "../MyButton"
import { empty, typeOf } from "@my-wzh/utils"
/**
 * 下载按钮
 * props.api 后端服务地址
 * props.params 参数表单
 * props.timeout 等待超时限制
 */
export default {
    name: 'MyDownload',
    emits: [],
    props: {},
    setup(props, { attrs, slots, emit }) {

        const onDownload = (url, fileName) => {
            const a = document.createElement('a')
            const el = document.body.appendChild(a)
            el.style.cssText = "z-index:-1;position:absolute;opacity:0"
            el.download = decodeURIComponent(fileName)
            el.target = '_blank'
            el.href = url
            //触发下载
            el.click()
            //删除a标签
            el.parentNode.removeChild(el)
        }
        const onError=(error)=>{
            console.log('MyDownload.onError',error);
        }
        const onSuccess = (response) => {
            console.log(response);
            if (empty(response)) {
                return console.log('MyDownload.onSuccess : response is null')
            }
            const { data, headers } = response
            // 文件流下载
            if (typeOf(data, 'blob')) {
                // 处理返回流
                const type = headers['content-type']
                // 从返回头中获取文件名
                const fileName = headers['content-disposition']?.split('=')[1] || '神秘文件'
                //生成Blob
                const blob = new Blob([data], [type])
                onDownload(URL.createObjectURL(blob), fileName)
            } else {
                //异步下载
                const fileName = response.fileName || response?.result?.fileName
                const url = response.url || response?.result?.url
                if (fileName && url) {
                    onDownload(url, fileName)
                }
            }
            emit('success', '操作成功')
        }

        return () => {

            const _attrs = {
                ...attrs,
                onSuccess,
                onError
            }

            return <MyButton { ..._attrs } v-slots={slots}></MyButton>
        }
    }
}