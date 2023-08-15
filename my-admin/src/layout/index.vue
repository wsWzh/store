<template>
  <a-layout class="my-layout">
    <my-layout-header />
    <a-layout class="arco-layout-has-sider">
      <my-layout-aside />
      <a-layout class="main-wrap">
        <my-crumb>
          <a-button size="mini" type="primary" @click="handleKeepalive">常驻按钮</a-button>
        </my-crumb>
        <a-layout class="component">
          <router-view #default="{ route, Component }">
            <transition enter-from-class="e-from" enter-active-class="e-active" enter-to-class="e-to">
              <keep-alive :include="keepaliveList">
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import MyLayoutHeader from './header.vue'
import MyLayoutAside from './aside.vue'
import { keepaliveList } from '../router/keepalive'
import { useRouter } from 'vue-router'

defineOptions({
  name:'layout'
})

const router = useRouter()

// 测试更新页面缓存
const handleKeepalive = () => {
  router.push({ name: 'MemberList' })
}

</script>
<style scoped lang='less'>
.my-layout,
.my-layout>.arco-layout,
:deep(.arco-table-element) {
  overflow: hidden;
}

:deep(.main-wrap>.arco-layout) {
  overflow: auto;
  // align-items: flex-start;
}

.component>div {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.e-from {
  opacity: 0;
}

.e-to {
  opacity: 1;

}

.e-active {
  transition: all 0.5s;
}
</style>