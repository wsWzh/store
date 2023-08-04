// import { createAxios } from '@my-wzh/axios'
import { createAxios } from '../../../axios'
import { Notification } from '@arco-design/web-vue'

const http = createAxios({ delay: 500, baseURL: '/api' })

const showNotification = (error) => {
    Notification.error(error.message || '操作失败')
}

// 注意这里拦截是在返回前 返回的延时不在这里生效
http.interceptors.response.use(res => res, error => {
    showNotification(error)
    return Promise.reject(error)
})

export { http, showNotification }



