// import { createAxios } from '@my-wzh/axios'
import { createAxios } from '../../../axios'

const http = createAxios({ delay: 500, baseURL: '/api' })

// 这里的.then.catch
http.interceptors.response.use(res=>{
    console.log('我是外部定义的响应成功',res);
    return res
},err=>{
    console.log('我是外部定义的响应失败', err);
})

export { http }



