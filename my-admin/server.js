/**
 * 本地模拟api服务
 */
const querystring = require('querystring');
const http = require('http')
const url2 = require('url')
const os = require('os')
const fs = require('fs')
const path = require('path')

// 端口
const apiPort = 4001

// 等待输出时间（s）
const tickTime = 5

const state = {}

// 生成随机 id
const randomId = len => {
    return Array.from({ length: len }, () => {
        return Math.ceil(Math.random() * 32).toString(32)
    }).join('')
}

// 测试数据
const items = Array.from({ length: 30 }, (_, index) => {
    const id = randomId(16)
    const year = 2000 + Math.ceil(Math.random() * 22)
    const month = Math.ceil(Math.random() * 12)
    const createTime = `${year}-${month}-01 39:31:03`
    const status = Math.floor(Math.random() * 2)
    const picture = 'https://static-nk.liux.co/image8/13462fa/28194a0700023d15_400_400.jpg'
    return { id, name: '测试' + id, createTime, status, picture }
})


// 模拟 api 返回
const success = result => {
    return {
        message: '操作成功2',
        success: true,
        result,
    }
}

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

// 获取本机 ip
function getIPAddress() {
    var interfaces = os.networkInterfaces()
    for (var devName in interfaces) {
        var iface = interfaces[devName]
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}


function getParams(query) {
    return (query || '').split('&').reduce((_params, str) => {
        const rs = /^(\w+)=(.+)$/.exec(str)
        if (rs == null) {
            return _params
        }
        return { ..._params, [rs[1]]: decodeURIComponent(rs[2]) }
    }, {})
}

function getCookie(cookie) {
    return cookie?.split('; ')?.reduce((_params, str) => {
        const rs = /^(\w+)=(.+)$/.exec(str)
        if (rs == null) {
            return _params
        }
        return { ..._params, [rs[1]]: decodeURIComponent(rs[2]) }
    }, {}) || {}
}

/**
 * 本地测试
 */
http.createServer(function (request, response) {

    response.writeHead(200, { 'Content-type': 'application/json' })

    function doOutput(data) {
        response.end(JSON.stringify(data))
    }


    // 模拟器延时
    setTimeout(() => {
        const urlInfo = url2.parse(request.url)
        const { pathname, query } = urlInfo
        const params = getParams(query)
        // console.log('pathname:' , pathname , urlInfo , params)

        const d = new Date()
        const updateTime = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

        const { token } = getCookie(request.headers.cookie)

        if (pathname !== '/get/hello') {
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
                post = querystring.parse(post)
                switch (pathname) {
                    case '/get/user/info':
                        const userInfo = {
                            name: 'wzh',
                            age: 18
                        }
                        return doOutput(success(userInfo))
                    case '/delete': // 删除
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
                    case '/post/change': // 添加
                        const { name, status, picture } = params
                        if (name == '' || name == null) {
                            return doOutput(error('name 不能为空'))
                        }
                        const id = randomId(16)
                        items.push({ id, createTime: updateTime, name, status: status || 0, picture: picture || '' })
                        return doOutput(success())
                    case '/put/change': // 编辑
                        const changeItem = items.find(({ id }) => id === params.id)
                        if (changeItem == null) {
                            return doOutput(error())
                        }
                        Object.assign(changeItem, params, { updateTime })
                        return doOutput(success())
                    case '/get/page': // 列表查询
                        const { pageNo = 1, pageSize = 10 } = getParams(query)
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
                    case '/get/download':
                        const filePath2 = path.join(__dirname, 'public/logo.png')
                        return fs.readFile(filePath2, (err, data) => {
                            response.writeHead(200, { 'Content-Type': 'application/json2' })
                            response.end(data)
                        })
                    case '/post/login':
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
                    case '/get/token': response.writeHead(401, { 'Content-Type': 'application/json' })
                        return doOutput(error('用户未登录'))
                    default:
                        return doOutput(error('接口不存在'))
                }
            }, 1000 * tickTime)
        })
    });

}).listen(apiPort, () => {
    console.log('api server is listen on ' + getIPAddress() + ':' + apiPort)
})


