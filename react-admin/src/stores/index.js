import useMenuStore from "./modules/menu"
import useUserStore from "./modules/user"

const storesMap = [useMenuStore, useUserStore].reduce((map, item) => {
    const { Storekey } = item
    return {...map,...{[Storekey]:item}}
}, {})

export const getStore = (key,fn) => {
    return storesMap[key](fn)
}

