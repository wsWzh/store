import { createPinia } from "pinia";
import { empty } from '@my-wzh/utils'

const mods = import.meta.globEager("./modules/*.js"); 

function getStores(mods) {
    return Object.keys(mods).reduce((map, path) => {
        const pathName = /\/(\w+)\.js/.exec(path)[1]
        const module = mods[path]?.default
        if (pathName ==='constant') {
            return { ...map, ...module }
        }
        return { ...map, [module.$id]: module }
    }, {})

}


export const stores = getStores(mods)
console.log(stores, 'stores');

const pinia = createPinia()

export default pinia
