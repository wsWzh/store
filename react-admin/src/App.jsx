import './App.css'
import Setting from './view/setting'
import Layout from './layout'
import { useRoutes, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from '@/view/home.jsx'
import rotues from '@/router'

function Routes() {
  return useRoutes(rotues);
}

function App() {

  return <Routes/>
}

export default App
