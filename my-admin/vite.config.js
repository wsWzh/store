import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname'


//代理地址
const target = 'http://localhost:4000'


console.log('proxy.target', target);


//插件配置
const plugins = [
  vue(),//处理vue
  vueJsx(),//处理jsx
  manualChunksPlugin(),//处理组件拆分
]


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

const server = {
  port:3000,
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

export default defineConfig({
  plugins,
  build,
  server,
  resolve,
})
