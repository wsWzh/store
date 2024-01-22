import { typeOf } from "@wzh-/utils"
import { useMemo } from "react"
import { formatValue } from "../_utils"

/**
 * 统一处理单选,多选,下拉
 * @param {*} UserCom
 * @returns
 */
export const withExtraProps = UserCom => {


    const _Component = (props) => {

        const { formatter, options } = props
        
        const formatOptions = useMemo(() => {
            return options.map(option => {
                if (typeOf(formatter, 'string')) {
                    const items = formatter.split(',')
                    const value = formatValue(option[items[0]])
                    const label = option[items[1]]
                    return { ...option, label, value }
                }
                if (typeOf(formatter, 'function')) {
                    const _option = formatter(option)
                    if (typeOf(_option, 'array')) {
                        const value = formatValue(_option[0])
                        const label = _option[1]
                        const disabled = option.disabled
                        return { disabled, label, value }
                    }
                    return { /*_*/ }
                }
            })
        }, [options])

        const _props = {
            ...props,
            options: formatOptions
        }

        return <UserCom {..._props} />
    }

    _Component.defaultProps = {
        formatter: 'value,label',
        update: () => { },
        options: [],
        onChange:()=>{}
    }

    return _Component;

}