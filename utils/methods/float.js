
function toLenItems (items){
    return items.map(v=>String(v).split('.')[1]?.length || 0)
}
console.log(toLenItems([1,2,3]));

export function floatPlus () {
    if(arguments.length<2){
        return arguments[1]
    }
}

console.log(floatPlus(1,2,3));