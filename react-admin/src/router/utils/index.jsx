import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { Spin, Row } from 'antd';
import { empty } from '@wzh-/utils'
import { LoadingOutlined } from '@ant-design/icons'
import ErrorPage from '../../view/error/500';
import { getStore } from '../../stores';
import { GET_MENUS, GET_USER_INFO } from '../../http';

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

    // 白名单放行
    if (witelist.includes(name)) {
        return children
    }

    //默认为true不然会先显示页面闪一下才显示错误页
    const [error, setError] = useState(true)
    const [Loading, setLoading] = useState(false)

    const useLoading = () => {
        setLoading(true)
        return () => setLoading(false)
    }

    // 拦截刚需数据
    const needStores = needItems.map(item => getStore(item))

    const getNeedDat = async () => {
        // Loading开始
        const closeLoading = useLoading()
        try {
            for (const item of needStores) {
                const { data, action } = item
                if (empty(data)) {
                    await action()
                }
            }
            setError(false)
        } catch (error) {
            console.log('error');
            setError(error)
        } finally {
            // loading结束
            closeLoading()
        }
    }

    useEffect(() => {
        getNeedDat()
    }, [])

    return Loading ? <LoadingPage /> : (error ? <ErrorPage {...error} /> : children)
}

const handelRoute = (route) => {
    return <Suspense fallback={LoadingPage()}>
        <RouteGuard route={route}>
            <route.component />
        </RouteGuard>
    </Suspense>
}



export const generateRouter = (routes) => {
    return routes.map(route => {
        if (route.children) {
            route.children = generateRouter(route.children)
        }
        route.element = handelRoute(route)
        return route
    })
}




