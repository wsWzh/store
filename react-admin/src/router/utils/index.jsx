import { Suspense } from 'react'
import { Spin, Row } from 'antd';


const Loading = () => {
    return <Row justify="center" align="middle">
        <Spin />
    </Row>
}

const handelRoute = (route) => {
    return <Suspense fallback={Loading()}>
        <route.component />
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




