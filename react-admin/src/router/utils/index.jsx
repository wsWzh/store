import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { Spin, Row } from 'antd';
import { empty } from '@wzh-/utils'
import { LoadingOutlined } from '@ant-design/icons'
import ErrorPage from '../../view/error/500';
import { getStore } from '../../stores';
import { GET_MENUS, GET_USER_INFO } from '../../http';
import KeepAlive from 'react-activation'

const LoadingPage = () => {
    return <Row justify="center" align="middle" style={{ flex: 1 }}>
        <Spin size='large' indicator={<LoadingOutlined />} />
    </Row>
}


//白名单
const witelist = [
    'home',
    'lose',
    '404',
    '500'
]

// 刚需数据
const needItems = [GET_USER_INFO, GET_MENUS]

// 路由守卫
const RouteGuard = ({ route, children }) => {
    const { name } = route
    const [error, setError] = useState(false)
    // 默认为true 不然会闪一下
    const [Loading, setLoading] = useState(true)

    // 拦截刚需数据
    const needStores = needItems.map(item => getStore(item))

    useEffect(() => {
        // 白名单放行 不能放在外面判断 有条件的调用hook
        if (witelist.includes(name)) {
            return setLoading(false)
        }

        const getNeedData = async () => {
            try {
                for (const item of needStores) {
                    const { data, action } = item
                    if (empty(data)) {
                        await action()
                    }
                }
                setError(false)
            } catch (error) {
                console.log('error', error);
                setError(error)
                return Promise.reject(error)
            } finally {
                // Loading结束
                setLoading(false)
            }
        }
        getNeedData()
    }, [])
    if (Loading) {
        return <LoadingPage />
    }
    if (error) {
        return <ErrorPage />
    }
    return children
}


const handelRoute = (route) => {
    return (
        <Suspense fallback={LoadingPage()}>
            <RouteGuard route={route}>
                <route.component />
            </RouteGuard>
        </Suspense>
    )
}



export const generateRouter = (routes) => {
    return routes.map(route => {
        if (route.children) {
            route.children = generateRouter(route.children)
            route.element = handelRoute(route)
        }else{
            route.element = handelRoute(route)
            // 只缓存最后一级有keepAlive标识
            const { meta,name } = route
            if(meta.keepAlive){
                route.element = <KeepAlive cacheKey={name} name={name}>{route.element}</KeepAlive>
            }
        }

        return route
    })
}