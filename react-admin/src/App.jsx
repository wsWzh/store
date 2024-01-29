import './App.css'
import { Routes } from './router'
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { HashRouter } from 'react-router-dom'

function Root() {

  return  <Routes />

}

export default Root
