#### 文件描述

```
├─axios
    ├─interceptors 拦截器
    │       ├─beforeRequest.js 处理 post 请求 qs
    │       ├─beforeResponse.js 处理返回状态分流
    │       ├─message.config.js 定义异常提示信息
    │
    ├─index.js // axios => http

```
#### 安装

```
npm install -D @wzh-/axios
```

#### 使用

```
import { createAxios } from "@wzh-/axios"

const http = createAxios({ delay: 500, baseURL: '/api' }) // 创建 axios 实例

http.get(url,params,config)//get请求

http.post(url,params,config)//post请求

http.put(url,params,config)//put请求

http.delet(url,params,config)//delete请求

http.interceptors.response.use(onFulfilled, onRejected)//二次拦截器
```