//判断数据类型或返回数据类型
/**
 * 处理复杂类型
 * @param target
 * @param typeName { string }
 * @returns { boolean|string }
 */
export function typeOf(target, typeName = undefined){
    const text=Object.prototype.toString.apply(target)
    const type = /^\[object (\w+)]$/.exec(text)[1].toLocaleLowerCase()
    return typeName ? typeName === type : type
}