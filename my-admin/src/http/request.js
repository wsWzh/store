// import { createAxios } from '@my-wzh/axios'
import { createAxios } from '../../../axios'

const http = createAxios({ delay: 500, baseURL: '/api' })

export { http }



