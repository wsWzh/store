import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const root =ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
)
