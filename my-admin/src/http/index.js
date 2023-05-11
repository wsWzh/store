import { debug } from '@wangzhengheng/utils'
// import { createAxios } from '@wangzhengheng/axios'
import { createAxios } from '../../../axios'

const mods = import.meta.globEager('./apis/*.js')

const apis = Object.values(mods).reduce((apis, mod) => {
    return { ...apis, ...mod }
}, {})


const http = createAxios({ delay: 500, baseURL: '/api' })

export { http }

console.log(http,apis);
export default {
    install: app => {
        Object.assign(app.config.globalProperties, { http, ...apis })
    }
}