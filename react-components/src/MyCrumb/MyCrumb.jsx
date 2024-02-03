import { Row, Breadcrumb, Space } from 'antd'
import routes from '@/router'
import { matchRoutes, useLocation, Link } from 'react-router-dom';

const style = { height: '50px', padding: "0 20px", borderBottom: 'solid 1px #eee',flexShrink: 0}


const MyCrumb = (props) => {
    const { children: slots } = props

    const { pathname } = useLocation()
    const matched = matchRoutes(routes, pathname)

    const itemRender = (item, params, items, paths) => {
        const { pathname, route } = item

        const last = items.indexOf(item) === items.length - 1;

        if (last) {
            return <span>{route?.meta?.title}</span>
        }
        return <Link to={route.redirect || pathname}>{route?.meta?.title}</Link>
    }


    return <Row justify="space-between" align="middle" style={style}>
        <Breadcrumb itemRender={itemRender} items={matched}></Breadcrumb>
        <Space>
            {slots}
        </Space>
    </Row>
}

export default MyCrumb;
