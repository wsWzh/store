
function toLenItems (items){
    return items.map(v=>String(v).split('.')[1]?.length || 0)
}

export function floatPlus () {
    if(arguments.length<2){
        return arguments[1]
    }
}
