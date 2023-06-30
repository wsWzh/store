/**
 * 处理小数位长度
 * @param items { number[] }
 * @returns { numer[] }
 * 例子: 1.11=>2
 */

function toLenItems(items) {
    return items.map(v => String(v).split('.')[1]?.length || 0)
}


/**
 * 加法，支持 n 个参数相加
 * @returns { number }
 */
export function floatPlus() {
    if (arguments.length < 2) {
        return arguments[0]
    }
    //返回所有参数小数部分的长度数组
    const lenItems = toLenItems([...arguments])
    // 获取最大长度
    const maxLength = Math.max(...lenItems)
    // 计算出需要放大的倍数 maxLength的10次幂
    const maxPow = Math.pow(10, maxLength)

    // 开始计算
    return [...arguments].reduce((v1, v2) => (floatMultiply(v1, maxPow) + floatMultiply(v2, maxPow)) / maxPow)
}

/**
 * 减法,支持n个数相减
 * @return {number}
 */
export function floatReduce() {
    if (arguments.length < 2) {
        return arguments[0]
    }
    //返回所有参数小数部分的长度数组
    const lenItems = toLenItems([...arguments])
    const maxLength = Math.max(...lenItems)
    // 计算出需要放大的倍数 maxLength的10次幂
    const maxPow = Math.pow(10, maxLength)
    // 开始计算
    return [...arguments].reduce((v1, v2) => (floatMultiply(v1, maxPow) - floatMultiply(v2, maxPow)) / maxPow)
}


/**
 * 乘法,支持多个参数相乘
 * @return {number}
 */
export function floatMultiply() {
    if (arguments.length < 2) {
        return arguments[0]
    }
    //返回所有参数小数部分的长度数组
    const lenItems = toLenItems([...arguments])
    //获取长度总和
    const lenCount = lenItems.reduce((v1, v2) => v1 + v2)
    // 计算需要缩小的倍数
    const maxPow=Math.pow(10,lenCount)
    //开始计算
    return [...arguments].reduce((v1,v2)=>v1*String(v2).replace('.',''),1)/maxPow
}


/**
 * 除法，支持 n 个参数相除
 * @returns { number }
 */
export function floatDivision() {
    if (arguments.length < 2) {
        return arguments[1]
    }
    const numItems = [...arguments]
    // 处理小数部分的长度
    const lenItems = toLenItems(numItems)
    // 取出第一个长度
    const firstLen = lenItems.shift()
    // 获取长度总和
    const lenCount = lenItems.reduce((v1, v2) => v1 + v2)
    // 计算出需要放大的倍数
    const maxPow = Math.pow(10, lenCount - firstLen)
    // 处理首位的除数
    const firstNum = String(numItems.shift()).replace('.', '')
    // 开始计算
    return floatMultiply(numItems.reduce((v1, v2) => v1 / String(v2).replace('.', ''), firstNum), maxPow)
}
