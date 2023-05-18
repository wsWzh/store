import { createRouter, createWebHashHistory } from 'vue-router'
import {debug} from '@wangzhengheng/utils'
import  keepalive  from './keepalive'


const mods = import.meta.globEager('./routes/*.js')

const routes=Object.values(mods).map(mod=>mod.default)

debug('routes >>>', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

// 路由改变后
router.afterEach(keepalive)