import { debug } from '@my-wzh/utils'
// import { createAxios } from '@my-wzh/axios'
import { createAxios } from '../../../axios'


const mods = import.meta.globEager('./apis/*.js')

export const apis = Object.values(mods).reduce((apis, mod) => {
    return { ...apis, ...mod }
}, {})


const http = createAxios({ delay: 500, baseURL: '/api' })

export { http }

export default {
    install: app => {
        Object.assign(app.config.globalProperties, { http, ...apis })
    }
}

