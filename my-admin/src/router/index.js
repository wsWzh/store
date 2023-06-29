import { createRouter, createWebHashHistory } from 'vue-router'
import {debug} from '@my-wzh/utils'

const mods = import.meta.globEager('./routes/*.js')

const routes=Object.values(mods).map(mod=>mod.default)

debug('routes >>>', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import _401 from './before_each/401'
//登录校验
router.beforeEach(_401)

import keepalive from './keepalive'
// 路由缓存
router.afterEach(keepalive)

import { onError } from './error'
//错误处理
router.onError(onError)


// beforeEach => afterEach => onError//执行顺序