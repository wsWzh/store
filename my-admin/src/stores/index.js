import { createPinia } from "pinia";
import { empty } from '../utils'

const mods = import.meta.globEager("./modules/*.js");

/**
 * 从模块对象中获取存储对象
 * @param {Object} mods - 模块对象
 * @returns {Object} - 存储对象
 */
function extractStores(mods) {
    return Object.keys(mods).reduce((map, path) => {
        const pathName = /\/(\w+)\.js/.exec(path)[1]
        const module = mods[path]?.default
        if (pathName === 'constant') {
            return { ...map, ...module }
        }
        return { ...map, [module.$id]: module }
    }, {})

}

// id=>pinia实例
export const storesMap = extractStores(mods)
console.log(storesMap, 'stores');

// 根据id获取stroe
export function getStore(key) {
    if (empty(storesMap[key])) {
        return console.warn(`${key} store empty`,);
    }
    return storesMap[key]()
}

const pinia = createPinia()

export default pinia

