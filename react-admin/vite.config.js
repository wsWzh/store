import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'


//路径别名
const resolve = {
  alias: {
    '@': path.resolve(__dirname, 'src')
  }
}

const plugins = [react()]

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  resolve
})
