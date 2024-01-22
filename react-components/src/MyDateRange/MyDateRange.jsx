import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { notEmpty } from '@wzh-/utils';

dayjs.extend(weekday); dayjs.extend(localeData);

/**
 * 日期范围 将数组[startTime,endTime]拆分startTime,endTime
 * showTime 是否显示时间选项
 * @param {*} props
 * @returns
 */
const MyDateRange = (props) => {
    const { start, end, showTime, update} = props;

    const fmt = showTime ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';

    const value = []

    if (notEmpty(start)){
        value[0] = dayjs(start, fmt)
    }
    if(notEmpty(end)){
        value[1] = dayjs(end, fmt)
    }

    const _onChange = (dates, dateStrings) => {

        const [start, end] = dateStrings
        props?.onChange(start)
        update(start, end)
    }

    const _props = {
        ...props,
        className: 'my-date-range',
        onChange: _onChange,
        value
    }
    return <DatePicker.RangePicker {..._props} />
}

MyDateRange.defaultProps = {
    showTime: false,
    update:()=>{}
}
export default MyDateRange;