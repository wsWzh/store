import { Suspense, lazy } from 'react'
import { useRoutes, createBrowserRouter } from "react-router-dom";
import Home from '../view/home'
import homeRoute from './routes/home'
const mods = import.meta.glob('./routes/*.js');

const promiseRoutes = Object.values(mods).map(async mod => mod().then(route => route.default));

const resolveRoutes = await Promise.all(promiseRoutes);

const handelRoute = (route) => {
    return <Suspense fallback={ <div> 加载中 </div>}>
        <route.component />
    </Suspense>
}

const generateRouter = (routes) => {
    return routes.map(route => {
        if (route.children) {
            route.children = generateRouter(route.children)
        }
        route.element = handelRoute(route)
        return route
    })
}
const routes = generateRouter(resolveRoutes)



export default routes