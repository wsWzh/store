import { reduceProps, typeOf ,empty} from "@wzh-/utils"
import { useMemo } from "react"
import { formatValue } from "../_utils"

/**
 * 统一处理单选,多选,下拉的选项
 * options选项 formatter
 * @param {array}options 选项
 * @param {string | function}formatter 格式化规则
 * @returns {array}formatOptions 根据formatter生成的新选项
 */
export const useOptions = (options, formatter = "label,value") => {
    const formatOptions= useMemo(()=>{
        if(empty(options)){
            return []
        }
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
    },[options])

    return formatOptions
}


/**
 * @param {object} props 要处理的props
 * @param {array} keys 要删除的指定key数组
 * @returns {object} newProps
 */
export const useDeleteProps = (props, keys = []) => {
    return reduceProps(props, ({ key }) => keys.includes(key))
}

/**
 * 给vnode添加额外的props
 * 传入的props会覆盖旧的
 * 返回合并props后的vnode
 * @param {vnode} vnode
 * @param {object} props
 * @returns vnode
 */
export const useVNodeWithProps = (vnode, props) => {
    if (!vnode.type) {
        return
    }
    return <vnode.type {...{ ...vnode.props, ...props }} />
}
