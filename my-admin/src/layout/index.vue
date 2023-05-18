<template>
  <a-layout class="my-layout">
    <my-layout-header />
    <a-layout class="arco-layout-has-sider">
      <my-layout-aside />
      <a-layout>
        <my-crumb>
          <a-button size="mini" type="primary" @click="handleKeepalive">常驻按钮</a-button>
        </my-crumb>
        <a-layout  class="main-wrap">
          <router-view v-slot="{ Component }">
            <keep-alive :include="keepaliveItems">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "layout",
}
</script>

<script setup>
import MyLayoutHeader from './header.vue'
import MyLayoutAside from './aside.vue'
import { keepaliveItems } from '../router/keepalive'
import { useRouter } from 'vue-router'

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

.main-wrap {
  overflow: auto;
  padding: 20px;
}
</style>