import { createPinia } from "pinia";
import { empty } from '@wangzhengheng/utils'

const mods = import.meta.globEager("./modules/*.js"); //glob pattern matching, so all files ending in.ts will be loaded as JavaScript files.


function getStores(mods) {
    return Object.keys(mods).reduce((map, path) => {
        const pathName = /\/(\w+)\.js/.exec(path)[1]
        const module = mods[path]?.default
        //常量 pinia没有id
        if (empty(module?.$id)) {
            return { ...map, ...module }
        }
        return { ...map, [module.$id]: module }
    }, {})

}


// Object.keys(mods).reduce((map, path) => {
//     const pathName = /\/(\w+)\.js/.exec(path)[1]
//     const module = mods[path]?.default
//     if (empty(module?.$id)) {
//         return { ...map, [pathName]: module }
//     }
//     return { ...map, [module.$id]: module }
// }, {})


export const stores = getStores(mods)
console.log(stores, 'stores');

const pinia = createPinia()

export default pinia
