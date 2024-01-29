// import { createAxios } from '@wzh-/axios'
import { createAxios } from '../../../axios'
import { Modal } from 'antd'

const http = createAxios({ delay: 500, baseURL: '/api' })

http.interceptors.response.use(res => res, error => {
    const status = error?.response.status
    if (status === 401) {
        const onOk = () => {
            const goto =  location.hash.replace('#', '')
            location.replace(`#/home?goto=${goto}`)
        }
        Modal.info({ content: '登录过期，请重新登录', onOk })
        return Promise.reject(error)
    }
    return Promise.reject(error)
})

export { http }



