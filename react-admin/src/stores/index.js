import useMenuStore from "./modules/menu"
import useUserStore from "./modules/user"
import constantStoresMap from "./modules/constant"

const customStoresMap = [useMenuStore, useUserStore].reduce((map, item) => {
    const { Storekey } = item
    return { ...map, ...{ [Storekey]: item } }
}, {})

const storesMap = {
    ...constantStoresMap,
    ...customStoresMap
}

console.log(storesMap,'stores');

export const getStore = (key, fn) => {
    if(storesMap[key]){
        return storesMap[key](fn)
    }
    return console.log(key,'store不存在');
}

