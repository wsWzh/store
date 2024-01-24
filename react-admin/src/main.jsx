import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { HashRouter, BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'))

const theme = {
  components: {
    Layout: { bodyBg: "#fff", siderBg: "#fff" },
    Menu: { itemBorderRadius: 0, subMenuItemBg: "#fff" }
  }
}

root.render(
  <AntdApp>
    <ConfigProvider locale={zhCN} theme={theme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ConfigProvider>
  </AntdApp>
)
