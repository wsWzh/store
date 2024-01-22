import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday); dayjs.extend(localeData);

const MyDateRange = (props) => {

    const { start,  end, showTime ,updateDate} = props;

    const fmt = showTime ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';

    const defaultValue = [dayjs(start, fmt), dayjs(end, fmt)]

    const onChange = (dates, dateStrings) => {
        console.log(dates, dateStrings);
        updateDate(dateStrings[0], dateStrings[1])
    }

    const _props = {
        ...props,
        className: 'my-date-range',
        onChange,
        defaultValue
    }
    return <DatePicker.RangePicker {..._props} />
}

MyDateRange.defaultProps = {
    showTime: false
}
export default MyDateRange;