import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { HashRouter, BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ConfigProvider locale={zhCN} theme={{ components: { Layout: { bodyBg: "#fff", siderBg: "#fff" } } }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
)
