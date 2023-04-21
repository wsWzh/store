import { createRouter, createWebHashHistory } from 'vue-router'
import {debug} from '@wangzhengheng/utils'

const mods = import.meta.globEager('./routes/*.js')

const routes=Object.values(mods).map(mod=>mod.default)

debug('routes >>>', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
