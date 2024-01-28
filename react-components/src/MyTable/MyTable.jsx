import { Form, Table, Row, Button, Space } from 'antd'
import { useSearchParams } from 'react-router-dom'
import React, { useState, useMemo, useEffect, useImperativeHandle, useCallback, useRef, Children } from 'react'
import { empty, reduceProps, typeOf } from '@wzh-/utils'
import { useDeleteProps } from '../_hook'
import MyPagination from './MyPagination.jsx'
/**
 * 表格组件
 * onRequest 请求数据源
 * columns 列表配置 render注入reload方法
 * selections? 复选框[Boolean, Array]
 * history? 值为真时，利用 url 记录当前查询的条件和分页
 * load? 值为真时组件载入后发送请求
 * bordered? 是否显示边框（默认否）
 * rowSelection? 表格的行选择器配置 selections传入数组预设复选的操作通过updateSelections更新selections
 * searchSlot? 参数插槽，提供参数：{ search,form }
 * pagination? 自定义分页区插槽，提供参数：{ dataInfo , search }
 * historySelect是否支持跨页勾选
 */
const MyTable = (props, ref) => {

    const {
        onRequest,
        rowKey = "id",
        columns,
        selections,
        updateSelections,
        history,
        load = true,
        rowSelection = {},//表格行是否可选择
        searchSlot,
        historySelect,
        bordered=false
    } = props

    const [loading, setLoading] = useState(false)
    const useLoading = () => {
        setLoading(true)
        return () => setLoading(false)
    }

    const [searchParams, setSearchParams] = useSearchParams()

    const [form] = Form.useForm()

    let query
    useEffect(() => {
        if (history) {
            // fromEntries 键值对数组转为对象
            // [['a', 1], ['b', 2], ['c', 3]]=>{ a: 1, b: 2, c: 3 }
            query = Object.fromEntries([...searchParams]);
            form.setFieldsValue(useDeleteProps(query, ['pageSize', 'pageNo']))
        }
    }, [])

    const [dataInfo, setDataInfo] = useState({})

    const dataSource = useMemo(() => dataInfo?.results || [], [dataInfo])

    const [error, setError] = useState(false)

    const ErrSlot = () => {
        return <Space style={{ height: "100%", justifyContent: "center" }}>
            {error.message}
            <Button onClick={reload}>刷新</Button>
        </Space>

    }

    //查询
    const search = async params => {
        // 重置
        if (params === null) {
            form.resetFields()
            setSearchParams({}, { replace: true })
        }
        // 非正常参数
        if (!typeOf(params, 'object') || params.nativeEvent) {
            params = {}
        }
        const formParams = form.getFieldsValue()
        const _params = reduceProps({ ...query, ...formParams, ...params }, ({ key, value }) => empty(value))
        if(history){
            // 记录参数 不增加路由记录
            setSearchParams(_params, { replace: true })
        }
        setError(false)
        const res = await onRequest(_params).catch(err => { setError(err) }).finally(useLoading())
        setDataInfo(res)
    }

    // 刷新数据
    const reload = () => {
        const pageNo = dataInfo?.pageNo || 1 //当前页码
        const pageSize = dataInfo?.pageSize || 10 //当前每页展示的数据条数
        return search({ pageNo, pageSize })
    }

    useEffect(() => {
        load && search()
    }, [])

    // render注入reload
    const _columns = useMemo(() => {
        return columns.map(item => {
            if (item.render) {
                const fn = item.render
                item.render = (text, record, index) => fn({ text, record, index }, { reload })
            }
        })
    }, [columns])

    const _props = {
        className: "my-table",
        dataSource,
        pagination: false,
        loading,
        scroll: { y: 240, x: "100%" },
        rowKey,
        columns: _columns,
        bordered,
        ...props,
    }

    const selectedRowKeys = useMemo(() => {
        return selections?.map?.(item => item?.[rowKey])
    }, [selections])

    if (typeOf(selections, 'array')) {
        const onSelect = (record, selected, selectedRows, nativeEvent) => {
            if (!updateSelections) {
                return
            }
            // 跨页多选
            if (historySelect) {
                let newSelections = []
                if (selected) {
                    newSelections = selections.concat(record)
                } else {
                    newSelections = selections.filter(item => item[rowKey] !== record[rowKey])
                }
                updateSelections(newSelections)

            } else {
                updateSelections(selectedRows.filter(Boolean))
            }

        }

        const onSelectAll = (selected, selectedRows, changeRows) => {
            if (!updateSelections) {
                return
            }
            // 跨页多选
            if (historySelect) {
                let newSelections = []
                if (selected) {
                    newSelections = selections.concat(changeRows)
                } else {
                    newSelections = selections.filter(item => !changeRows.includes(item))
                }
                updateSelections(newSelections)
            } else {
                updateSelections(selectedRows.filter(Boolean))
            }
        }

        const _selectProps = {
            rowSelection: {
                type: "checkbox",
                selectedRowKeys,
                onSelect,
                onSelectAll,
                ...rowSelection
            }
        }
        Object.assign(_props, _selectProps)
    }

    useImperativeHandle(ref, () => ({
        search,
        reload,
        dataInfo
    }))

    const formProps = {
        form,
        layout: "inline",
        labelAlign: "right",
        wrapperCol: { flex: 1 },
        labelCol: { flex: '80px' },
        variant: "filled",
        children: searchSlot({ search, form })
    }

    const paginationProps = {
        data: dataInfo || {},
        search,
        disabled: loading
    }

    return <>
        <Form {...formProps} />
        {error ? <ErrSlot /> : <Table {..._props} ></Table>}
        <MyPagination {...paginationProps} />
    </>;
}

export default React.forwardRef(MyTable);