import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

//代理地址
const target = 'http://localhost:4001'

console.log('proxy.target', target);

const server = {
  port: 8080,
  proxy: {
    '/api': {
      target,
      changeOrigin: true, // 设置请求头为 target
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}

//路径别名
const resolve = {
  alias: {
    '@': path.resolve(__dirname, 'src')
  }
}

const plugins = [react()]

// https://vitejs.dev/config/
export default defineConfig({
  server,
  plugins,
  resolve
})
