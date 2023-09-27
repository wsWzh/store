// import { createAxios } from '@wzh-/axios'
import { createAxios } from '../../../axios'
import { Notification, Modal } from '@arco-design/web-vue'
import router from '../router'

const http = createAxios({ delay: 500, baseURL: '/api' })

const showNotification = (error) => {
    Notification.error(error.message || '操作失败')
}

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
    showNotification(error)
    return Promise.reject(error)
})

export { http, showNotification }



