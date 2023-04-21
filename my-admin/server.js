//模拟请求 __dirname 无论在哪里都可以直接使用，代表当前路径
const querystring = require('querystring')//处理请求查询参数
const http = require('http')//处理请求
const url2 = require('url')
const os = require('os')//获取电脑系统相关信息
const fs = require('fs')//处理文件 readFile读,writeFile写,appendFile添加,unlink删除
const path = require('path')//处理路径

const apiPort = 4001//端口

const tickTime = 1 //输出等待时间(s)

//生成随机id
const randomId = len => {
    return Array(len).fill('').map(() => {
        return Math.ceil(Math.random() * 32).toString(32)
    }).join('')
}

// 测试数据
const item = Array(10).fill('').map((item, index) => {
    const id = randomId(16)
    const year = 2000 + Math.ceil(Math.random() * 23)
    const month = Math.ceil(Math.random() * 12)
    const createTime = `${year}-${month}-01 23:59:59`
    const status = Math.floor(Math.random() * 2)
    const picture = 'https://static-nk.liux.co/image8/13462fa/28194a0700023d15_400_400.jpg'

    return { id, name: '测试' + index, createTime, status, picture }
})

//模拟成功返回
const success = result => {
    return {
        message: '操作成功2',
        success: true,
        result,
    }
}

//模拟错误返回
const error = result => {
    let message = '操作失败2'
    if (typeof result === 'string') {
        message = result
        result = undefined
    }
    return {
        message,
        success: false,
        result,
    }
}

//获取本机ip
function getIPAddress() {
    const interfaces = os.networkInterfaces()
    for (var devName in interfaces) {
        var iface = interfaces[devName]
        for (var i = 0; i < iface.length; i++) {
            const alias = iface[i]
            if (alias.family === 'IPv4' && !alias.internal && alias.address !== '127.0.0.1') {
                return alias.address
            }
        }
    }
}

//处理请求参数
function getPrams(query) {
    return (query || '').split('&').reduce((params, str) => {
        const rs = /^(\w+)=(.+)$/.exec(str)
        if (rs == null) {
            return params
        }
        return { ...params, [rs[1]]: decodeURIComponent(rs[2]) }
    }, {}) || {}
}

// 处理cookie
function getCookie(cookie) {
    return cookie?.split(';').reduce((params, str) => {
        const rs = /^(\w+)=(.+)$/.exec(str)
        if (rs == null) {
            return params
        }
        return { ...params, [rs[1]]: decodeURIComponent(rs[2]) }
    }, {}) || {}
}

//创建本地服务 模拟请求
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-type': 'application/json' })

    //处理请求返回
    function doOutput(data) {
        response.end(JSON.stringify(data))
    }

    //模拟返回延时
    setTimeout(() => {
        const urlInfo = url2.parse(request.url)
        const { pathName, query } = urlInfo
        const params = getPrams(query)

        const d = new Date()
        const updateTime = `${d.getFullYear()}-${d.getMonth + 1}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`

        const { token } = getCookie(request.headers.cookie)

        if (pathName !== '/get/hello') {
            // if (token == null || token !== state.token) {
            //   response.writeHead(401 , { 'Content-Type': 'application/json' })
            //   return doOutput(error('请登陆'))
            // }
        }

        let post = ''

        request.on('data', chunk => {
            post += chunk
        });

        request.on('end', function () {
            setTimeout(() => {
                post = querystring.parse(post) //参数转成键值对 'name=123&age=18' => {name:'123',age:18}
                switch (pathName) {
                    case '/delet': //删除
                        const deleteState = items.some(({ id }, index) => {
                            if (id === params.id) {
                                items.splice(index, 1)
                                return true
                            }
                        })
                        if (!deleteState) {
                            return doOutput(error())
                        }
                        return doOutput(success())
                    case '/put/change': //添加
                        const { name, status, picture } = params
                        if (name == '' || name == null) {
                            return doOutput(error('name 不能为空'))
                        }
                        const id = randomId(16)
                        items.push({ id, createTime: updateTime, name, status: status || 0, picture: picture || '' })
                        return doOutput(success())
                    case '/get/page': // 列表查询
                        const { pageNo = 1, pageSize = 20 } = getParams(query)
                        const _items = items.filter(item => {
                            const { name = '', status } = params
                            if (status != null && item.status !== +status) {
                                return false
                            }
                            if (item.name.indexOf(name) > -1) {
                                return true
                            }
                        })
                        const result = {
                            pageNo: +pageNo,
                            pageSize: +pageSize,
                            totalRecord: _items.length,
                            totalPage: Math.ceil(_items.length / pageSize),
                            results: _items.filter((_, index) => {
                                if (index >= (pageNo - 1) * pageSize && index < pageNo * pageSize) {
                                    return true
                                }
                            })
                        }
                        return doOutput(success(result))
                    case '/get/options': // 选项
                        const options = [
                            { key: 0, name: '下架' },
                            { key: 1, name: '上架' },
                        ]
                        return doOutput(success(options))
                    case '/post/upload': // 图片上传
                        const url = 'https://static-nk.liux.co/image8/13462fa/28194a0700023d15_400_400.jpg'
                        const filePath = '/image8/13462fa/28194a0700023d15_400_400.jpg'
                        return doOutput(success([{ url, filePath }]))
                    case '/get/download': //下载
                        const filePath2 = path.join(__dirname, 'public/logo.png')
                        return fs.readFile(filePath2, (err, data) => {
                            response.writeHead(200, { 'Content-Type': 'application/json2' })
                            response.end(data)
                        })
                    case '/post/login': //登陆
                        const dateString = new Date(Date.now() + 1000 * 60 * 30).toUTCString()
                        state.token = randomId(16)
                        response.writeHead(200, {
                            'Set-Cookie': `token=${state.token}; Max-Age=1800; Expires=${dateString}; Path=/; HttpOnly`,
                            'Content-Type': 'text/plain; charset=utf-8',
                        })
                        return doOutput(success())
                    case '/error': // 错误
                        response.writeHead(500, { 'Content-Type': 'application/json' })
                        return doOutput(error('系统出小差'))
                    case '/success': // 成功
                        return doOutput(success())
                    default:
                        return doOutput(error('接口不存在'))
                }
            }, tickTime * 1000)
        })
    })
}).listen(apiPort, () => {
    console.log('api server is listen on ' + getIPAddress() + ':' + apiPort)
})