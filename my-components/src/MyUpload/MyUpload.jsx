import { Upload as AUpload } from "@arco-design/web-vue"
import { ref } from 'vue'
import { empty, typeOf } from '@wzh-/utils'

// 提示语用后缀
const accepts = {
    'image/jpeg': 'jpeg,jpg',
    'image/png': 'png',
    'image/gif': 'gif',
}

/**
 * 上传按钮
 */
export default {
    name: 'MyUpload',
    emits: ['update:modelValue', 'update:loading', 'success', 'error'],
    props: {
        modelValue: [String, Array],
        responseUrlKey: { type: String, default: 'filePath' },//接口字段
        accept: { type: String, default: 'image/jpeg,image/png' },//文件类型
        maxSize: { type: Number, default: 10 }, //大小限制 单位兆
        name: { type: String, default: 'files' }, // 后端接收字段
        origin: { type: String, default: '' }, // 资源域名
        action: { type: Function, required: true }, // 请求过程处理: (...options) => http.post(url , ...options)
    },
    setup(props, { attrs, slots, emit }) {
        const loading = ref(false)
        const setLoading = bool => {
            if (empty(slots['upload-button'])) {
                return
            }
            loading.value = bool
            //自定义插槽同步loading
            emit('update:loading', bool)
        }

        //超出上传限制提示
        const onExceedLimit = dataList => {
            const { limit } = attrs
            const error = `超过了最大上传数量${limit},最多可选${limit - dataList.length}个文件`
            emit('error', new Error(error))
        }

        //处理fileList=>modelValue
        const doUpdateFileList = fileList => {
            if (fileList.some(({ status }) => status !== 'done')) {
                return false //等待所有文件上传完成后更新 modelValue
            }
            const items = fileList.map(file => {
                const { url, response } = file
                return response[props.responseUrlKey] || url
            })
            const isArray = typeOf(props.modelValue, 'array')
            emit('update:modelValue', isArray ? items : items.join(','))//保持双向数据绑定值类型一致
            emit('change', fileList) //监听文件列表变化
        }

        /**
         * 上传前 限制处理
         * return false或promise.reject时终止上传
         * file file: File
         * return boolean | Promise<boolean | File>
         *  */
        const onBeforeUpload = file => {
            const { size, name, type } = file
            const { maxSize, accept } = props
            //文件大小限制
            if (size > maxSize * 1024 * 1024) {
                const message = `上传文件不能大于${maxSize < 1 ? 1024 * maxSize + 'KB' : maxSize + 'M'}`
                const error = new Error(message)
                emit('error', error)
                return Promise.reject(error)
            }

            if (empty(accept)) {
                return true
            }

            const typeItem = accept.split(',')
            //文件类型校验
            if (typeItem.includes(type)) {
                return true
            }

            //文件后缀
            const suffixItems = typeItem.reduce((acc, ac) => acc.concat(accepts[ac] || ac), [])
            if (!suffixItems.includes(/\.(\w+)$/.exec(name)?.[1].toLowerCase())) {
                const message = `请选择${suffixItems.toString().replace(/,/g, '、')}类型的文件`
                const error = new Error(message)
                emit('error', error)
                return Promise.reject(error)
            }

            return true

        }

        // 处理上传
        const customRequest = (options) => {
            const { fileItem, onProgress, onSuccess, onError } = options
            const formData = new FormData()
            formData.append(props.name, fileItem.file)

            //持续监听 上传进度条  axios处理进度条的函数名称
            const onUploadProgress = (event) => {
                const percent = event.total > 0 ? (event.loaded / event.total) : undefined
                onProgress(parseInt(percent), event)
            }

            setLoading(true) //loading

            return props.action(formData, { onUploadProgress }).then(res => {
                const file = res?.[0] || res?.result?.[0] || {}
                emit('success', res)
                // 上传成功后，调用onSuccess方法
                // 传入的res参数将会附加到当前上传文件的response字段上
                return onSuccess(file)
            }).catch(error => {
                emit('error', error)
                return onError(error)
            }).finally(() => setLoading(false))
        }

        // 把 modelValue 转换成AUpload组件适用的数据结构
        const fileInit = filePath => {
            const url = (/^https?:\/\//.test(filePath) ? '' : props.origin) + filePath
            const response = { filePath }
            return { url, response }
        }

        // modelValue [url] | url,
        // url => FileList [{url, response}]
        const asyncFileList = value => {
            if (empty(value)) {
                return []
            }
            if (typeOf(value, 'array')) {
                return value.map(fileInit)
            }
            return value.split(',').map(fileInit)
        }
        const cs = (fileItem)=>{
            console.log(fileItem,123);
        }
        return () => {

            const { modelValue, action, name, accept, responseUrlKey } = props

            const _attrs = {
                class: 'my-upload',
                'onUpdate:fileList': doUpdateFileList,
                fileList: asyncFileList(modelValue),
                onBeforeUpload,
                customRequest,
                onExceedLimit,
                imagePreview: true,//图片预览
                imageLoading: 'layz',//懒加载
                listType: 'picture-card',
                accept,
                name,
                responseUrlKey,
                onSuccess:cs
            }

            if (typeOf(action, 'string')) {
                Object.assign(_attrs, { action })
            }

            // 重构插槽参数（优化按钮交互状态）
            const _slots = { ...slots }

            const triggerButton = slots['upload-button']?.({ loading: loading.value, disabled: attrs.disabled || loading.value })

            if (!empty(triggerButton)) {
                _slots['upload-button'] = () => triggerButton
            }

            return <AUpload {..._attrs} v-slots={_slots} />
        }
    }
}