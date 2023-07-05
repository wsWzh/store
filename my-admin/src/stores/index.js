import { createPinia } from "pinia";

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

export const stores = extractStores(mods)
console.log(stores,'stores');
export function getStore(key){
    return stores[key]()
}

const pinia = createPinia()

export default pinia
