import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { notEmpty } from '@wzh-/utils';
import { useMemo } from 'react'
dayjs.extend(weekday); dayjs.extend(localeData);

/**
 * 日期范围 将数组[startTime,endTime]拆分startTime,endTime
 * showTime 是否显示时间选项 返回值 showTime ?' YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
 * 在表单中使用需要 设置 form,isForm和endName(结束时间字段)
 * @param {*} props
 * @returns
 */

const MyDateRange = (props) => {
    const { start, end, showTime, update, form, id: startName, value: v, endName, isForm } = props;

    const fmt = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';

    let handleValue, handelChange
    let handleFormValue, handelFormChange

    // 只处理在form表单的第一个日期框的回显和更新
    const isStart = (!isForm && endName)
    if (isStart) {
        handleFormValue = () => {
            let dateRange = []
            const rangeObj = form.getFieldsValue([endName, startName])
            const startValue = rangeObj[startName]
            const endValue = rangeObj[endName]
            if (startValue) {
                dateRange[0] = dayjs(startValue, fmt)
            }
            if (endValue) {
                dateRange[1] = dayjs(endValue, fmt)
            }

            return dateRange
        }
        handelFormChange = (start, end) => {
            form.setFieldValue(startName, start)
            form.setFieldValue(endName, end)
        }
    }

    // 处理不在表单中的日期框回显和更新
    if (!props.id) {
        handleValue = () => {
            let dateRange = []

            if (start) {
                dateRange[0] = dayjs(start, fmt)
            }
            if (end) {
                dateRange[1] = dayjs(end, fmt)
            }
            return dateRange
        }

        handelChange = (start, end) => {
            update(start, end)
        }
    }

    const value = useMemo(() => {
        if (handleFormValue) {
            return handleFormValue()
        }
        if (handleValue) {
            return handleValue()
        }
    }, [v, start, end])

    const _onChange = (dates, dateStrings) => {
        const [start, end] = dateStrings
        if (handelFormChange){
            handelFormChange(start, end)
        }
        if(handelChange){
            handelChange(start, end)
        }
    }

    const _props = {
        ...props,
        className: 'my-date-range',
        onChange: _onChange,
        value
    }

    // 说明是表单
    if (isForm) {
        return < >
            <Form.Item name={startName} style={{ marginBottom: "unset" }}>
                <MyDateRange endName={endName} form={form} />
            </Form.Item>
            <Form.Item name={endName} style={{ position: 'absolute', zIndex: -1, opacity: 0 }}>
                <MyDateRange />
            </Form.Item>
        </>

    }
    return <DatePicker.RangePicker {..._props} />
}

MyDateRange.defaultProps = {
    showTime: false,
    update: () => { }
}
export default MyDateRange;