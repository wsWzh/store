//返回数据类型
export function typeOf(target, typeName = undefined){
    const text=Object.prototype.toString.apply(target)
    const type = /^\[object (\w+)]$/.exec(text)[1].toLocaleLowerCase()
    return typeName ? typeName === type : type
}