import { Suspense, useEffect } from 'react'
import { Spin, Row } from 'antd';
import { useUserStore } from '../../stores';
import { empty } from '@wzh-/utils'


const Loading = () => {
    return <Row justify="center" align="middle">
        <Spin />
    </Row>
}

// 路由守卫
const RouteGuard = ({ route, children }) => {

    const { userInfo, getUserInfo } = useUserStore()

    useEffect(() => {
        const cs = async () => {
            if (empty(userInfo)) {
                await getUserInfo()
                console.log(123);
            }
        }
        cs()
    }, [])

    return children
}

const handelRoute = (route) => {
    return <Suspense fallback={Loading()}>
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




