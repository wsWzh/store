import { empty } from './empty.js'
import { typeOf } from './typeOf.js'


/**
 * 处理多端兼容创建时间对象
 * @param target
 * @returns {Date}
 */

export function createDate(target) {
    if (typeOf(target, 'date')) {
        return target
    }
    if (typeOf(target, 'number')) {
        return new Date(target)
    }
    if (typeOf(target, 'string')) {
        const items = /^(\d{4})-(\d{2})-(\d{2})(\s(\d{2}):(\d{2}):(\d{2}))?$/.exec(target)
        if (items) {
            return new Date(+items[1], +items[2] - 1, +items[3], +items[5] || 0, +items[6] || 0, +items[7] || 0)
        }
        console.warn('createDate.error', items, target)

    }
    return new Date()

}

/**
 * 时间格式化
 * @param target { string | number | Date }
 * @param fmt { string | boolean } 当取 boolean=true 时带上时分秒
 */
export function formatDate(target, fmt = 'yyyy-MM-dd') {
    if (empty(target)) {
        return ''
    }
    const innerDate = createDate(target)
    // 无效时间
    if (['Invalid Date'].includes(innerDate.toString())) {
        return target
    }

    const config = {
        'M+': innerDate.getMonth() + 1, //月
        'd+': innerDate.getDate(), //日
        'h+': innerDate.getHours(),//时
        'm+': innerDate.getMinutes(),//秒
        'q+': Math.floor(3 + (innerDate.getMonth() + 1) / 3),  //季度
        'S': innerDate.getMilliseconds() //毫秒
    }
    fmt = ([true].includes(fmt)) ? 'yyyy-MM-dd hh:mm:ss' : fmt
    //匹配连续出现的yyyy并替换成innerDate.getFullYear()
    fmt = fmt.replace(/(y+)/, v => {
        return (''+innerDate.getFullYear()).substr(4 - v.length)
    })
    //补0 5月 M=>5 MM=>05
    for (const key in config) {
        fmt = fmt.replace(new RegExp(`(${key})`) , v => {
            if (v.length === 1) {
                return config[key]
            }
            return ('00' + config[key]).substr((''+config[key]).length)
        })
    }
    return fmt
}