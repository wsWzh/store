// import { createAxios } from '@wzh-/axios'
import { createAxios } from '../../../axios'

const http = createAxios({ delay: 500, baseURL: '/api' })



http.interceptors.response.use(res => res, error => {
    const status = error?.response.status
    if (status === 401) {
        const onOk = () => {
            const query = { goto: location.hash.replace('#', '') }
            router.push({ name: 'home', query })
        }
        Modal.info({ content: '登录过期，请重新登录', onOk })
        return Promise.reject(error)
    }
    return Promise.reject(error)
})

export { http }



