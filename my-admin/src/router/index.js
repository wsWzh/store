import { createRouter, createWebHashHistory } from 'vue-router'
import { onError, createLodingDoc, closeLoading } from './error'
import {debug} from '@my-wzh/utils'

const mods = import.meta.globEager('./routes/*.js')

const routes=Object.values(mods).map(mod=>mod.default)

debug('routes >>>', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router

// 创建loading
router.beforeEach(createLodingDoc)

import _401 from './before_each/401'
//登录校验
router.beforeEach(_401)

import keepalive from './keepalive'
// 页面缓存
router.afterEach(keepalive)

// 关闭loading
router.afterEach(closeLoading)

//错误处理
router.onError(onError)


// 执行顺序:beforeEach => afterEach => onError 中间的beforeEach和afterEach其中一个报错跳过其余的路由拦截直接执行onError