import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

const plugins = [react()]

//打包时间YYddHHmm
const v = new Date()
const vs = [v.getFullYear(), v.getMonth() + 1, v.getDate(), v.getHours(), v.getMinutes()]
const timestamp = vs.map(v => v > 60 ? v.toString().substr(2, 4) : v).join('')

// 编译配置
const build = {
  rollupOptions: {
    output: {
      // 转成可阅读版本号
      entryFileNames: `js/[name].${timestamp}.js`,
      chunkFileNames: `js/[name].${timestamp}.js`,
      assetFileNames: `[ext]/[name].${timestamp}.[ext]`
    }
  }
}

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


// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  build,
  server,
  resolve,
})
