import { Upload } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from 'antd'
import { empty, typeOf } from '@wzh-/utils';
import { PlusOutlined } from '@ant-design/icons';
import './MyUpload.css'
import { isButton } from '../_utils';
import { useVNodeWithProps } from '../_hook';

// 提示语用后缀
const accepts = {
    'image/jpeg': 'jpeg,jpg',
    'image/png': 'png',
    'image/gif': 'gif',
}
/**
 * 不设置value时需要设置BtnSlot代表只有上传行为 不用处理flieList 不会出现文件列表
 * responseUrlKey接口返回字段
 * name提交字段
 * action请求函数返回一个promise
 * BtnSlot是按钮时使用按钮上传
 * @param {*} props
 * @returns
 */
const MyUpload = (props) => {

    const {
        accept,
        maxCount,
        value,
        maxSize,
        onError,
        onSuccess,
        origin,
        onChange,
        action,
        responseUrlKey,
        name,
        disabled,
        BtnSlot,
        multiple
    } = props

    const [isMax, setIsMax] = useState(false)

    // 上传前校验
    const beforeUpload = useCallback((file, currentList) => {
        const { type, size, name } = file

        const total = currentList.length + fileList.length
        if (total > maxCount) {
            setIsMax(true)
            const message = `文件上传数量不能大于${maxCount}，请重新上传`
            const error = new Error(message)
            onError(error)
            return Promise.reject(error)
        }
        setIsMax(false)
        if (size > maxSize * 1024 * 1024) {
            const message = `文件大小不能超过${maxSize < 1 ? maxSize * 1024 + 'KB' : maxSize + 'MB'}`
            const error = new Error(message)
            // 通知tips
            onError(error)
            return Promise.reject(error)
        }
        if (empty(accept)) {
            return true
        }
        const typeItems = accept.split(',')
        if (typeItems.includes(type)) {
            return true
        }

        // 文件后缀
        const suffixItems = typeItems.reduce((arr, item) => arr.concat(accepts[item] || item), [])
        const suffix = /\.(\w)+$/.exec(name)?.[1].toLowerCase()
        if (!suffixItems.includes(suffix)) {
            const message = `请选择${suffixItems.toString().replace(/,/g, '、')}的文件`
            const error = new Error(message)
            onError(error)
            return Promise.reject(error)
        }
        return true
    })

    // 这里拿到上传更新的值
    // 需要一直更新fileList不然只触发一次
    const _onChage = ({ file, fileList, event }) => {

        if (isMax) {
            return
        }
        if (BtnSlot) {
            return
        }

        if (fileList.some(item => item.status !== 'done')) {
            return setFileList(fileList)
        }

        // 全部done才更新
        // 最后一次需要设置接口返回的图片
        // 有可能会出现上传的图片和接口返回的图片不一致
        const isArray = typeOf(value, 'array')
        const items = fileList.map(file => {
            const { url, response } = file
            return response?.[responseUrlKey] || url
        })

        const newValue = isArray ? items : items.join(',')
        setFileList(asyncFileList(newValue))
        onChange(newValue)
    }

    const [loading, setLoading] = useState(false)
    const changeLoading = bool => {
        if (empty(BtnSlot)) {
            return
        }
        setLoading(bool)
    }

    // 自定义上传
    const customRequest = options => {
        const { file, onSuccess: _onSuccess, onError: _onError, onProgress } = options
        const formData = new FormData()
        formData.append(name, file)

        //持续监听 上传进度条  axios处理进度条的函数名称
        const onUploadProgress = (event) => {
            const percent = event.total > 0 ? (event.loaded / event.total) : undefined
            onProgress(parseInt(percent), event)
        }
        changeLoading(true)
        return action(formData, { onUploadProgress }).then(res => {
            const file = res?.[0] || res?.result?.[0] || {}
            onSuccess(res)//通知mytips
            return _onSuccess(file)
        }).catch(err => {
            onError(err)//通知mytips
            return _onError(err)
        }).finally(() => changeLoading(false))

    }

    // 格式化filelist
    const fileInit = filePath => {
        const url = /^https?:\/\//.test(filePath) ? filePath : origin + filePath
        // status: 'uploading' 时percent才生效 设置status初始值为done 不然会影响onChange的判断
        return typeOf(filePath, 'object') ? filePath : { url, status: 'done' }
    }

    const asyncFileList = value => {
        if (empty(value)) {
            return []
        }
        if (typeOf(value, 'array')) {
            return value.map(fileInit)
        }
        return value.split(',').map(fileInit)
    }

    const [fileList, setFileList] = useState([])

    useEffect(() => {

        // 按钮上传不处理文件列表
        if (BtnSlot) {
            return
        }

        if (empty(value) || !empty(fileList)) {
            return
        }
        // 只有初始化fileList为空才赋值 避免频繁渲染
        setFileList(asyncFileList(value))
    }, [value])


    const uploadButton = (
        <button style={{ border: 0, background: 'none', }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8, }} >  Upload</div>
        </button>
    );


    let _props = {
        className: 'my-upload',
        customRequest,
        onChange: _onChage,
        beforeUpload,
        listType: BtnSlot ? '' : "picture-card",
        fileList,
        maxCount,
        disabled,
        multiple
    }

    const _BtnSlot = () => {
        if (!BtnSlot) {
            return
        }
        return useVNodeWithProps(BtnSlot, { loading, disabled: disabled || loading })
    }

    return <Upload {..._props}>
        {BtnSlot ? _BtnSlot() : maxCount > fileList.length ? uploadButton : ''}
    </Upload>
}

MyUpload.defaultProps = {
    maxSize: 10,
    onError: () => { },
    onSuccess: () => { },
    responseUrlKey: 'filePath',
    name: "files",
}

export default MyUpload;