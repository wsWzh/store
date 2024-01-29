import ReactDOM from 'react-dom/client'
import './index.css'
import { ConfigProvider } from 'antd';
import { Routes } from './router'
import zhCN from 'antd/locale/zh_CN';
import { HashRouter } from 'react-router-dom'
import { AliveScope } from 'react-activation'

function Root() {
    return <Routes />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const customTheme = {
    components: {
        Layout: { bodyBg: "#fff", siderBg: "#fff" },
        Menu: { itemBorderRadius: 0, subMenuItemBg: "#fff" }
    }
}

// holderRender处理ant message 、modal 、notification静态方法
ConfigProvider.config({
    holderRender: (children) => children
})

root.render(
    <AliveScope>
        <HashRouter>
            <ConfigProvider locale={zhCN} theme={customTheme}>
                <Root />
            </ConfigProvider>
        </HashRouter>
    </AliveScope>
)
