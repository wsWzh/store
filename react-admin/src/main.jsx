import ReactDOM from 'react-dom/client'
import Root from './App.jsx'
import './index.css'
import { ConfigProvider, App, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
const customTheme = {
    components: {
        Layout: { bodyBg: "#fff", siderBg: "#fff" },
        Menu: { itemBorderRadius: 0, subMenuItemBg: "#fff" }
    }
}

// holderRender处理ant message 、modal 、notification静态方法
ConfigProvider.config({
    holderRender: (children) => ( <>{children}</>),
})

root.render(

    <HashRouter>
        <ConfigProvider locale={zhCN} theme={customTheme}>
            <Root />
        </ConfigProvider>
    </HashRouter>
)
