import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { empty, notEmpty } from '@wzh-/utils';
import { useMemo, useState, useRef } from 'react'
import EventBus from '../eventBus';
dayjs.extend(weekday); dayjs.extend(localeData);
const bus = new EventBus()

/**
 * 日期范围 将数组[startTime,endTime]拆分startTime,endTime
 * showTime 是否显示时间选项
 * @param {*} props
 * @returns
 */
const MyDateRange = (props) => {

    const { RangePicker } = DatePicker;

    let {
        start,
        end,
        showTime,
        update,
        id,
        onChange,
        value: v,
        totalChange,
        isStart,
        isEnd
    } = props;

    const fmt = showTime ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';

    if (isEnd && !bus.events['endChage']?.length) {
        bus.on('endChage', onChange)
    }

    const value = useMemo(() => {
        const dateRange = []
        dateRange[0] = dayjs(v, fmt)
        dateRange[1] = dayjs(v, fmt)
        return dateRange
    }, [v])


    const _onChange = (dates, dateStrings) => {
        const [start, end] = dateStrings
        totalChange(dateStrings)
        isStart && onChange(start)
        bus.emit('endChage', end)
    }

    const _props = {
        ...props,
        className: 'my-date-range',
        onChange: _onChange,
        value,
    }


    if (empty(id) || !id.includes(',')) {

        return <RangePicker {..._props} />

    } else {
        const [startKey, endKey] = id.split(',');

        return <div>
            <Form.Item name={startKey} >
                <MyDateRange totalChange={onChange} isStart />
            </Form.Item >
            <Form.Item name={endKey} >
                <MyDateRange isEnd />
            </Form.Item >
        </div>
    }

}

MyDateRange.defaultProps = {
    showTime: false,
    update: () => { },
    onChange: () => { }
}
export default MyDateRange;