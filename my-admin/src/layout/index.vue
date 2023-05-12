<template>
  <a-layout class="my-layout">
    <my-layout-header />
    <a-layout class="arco-layout-has-sider">
      <my-layout-aside />
      <a-layout class="main-wrap">
        <router-view></router-view>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import MyLayoutHeader from './header.vue'
import MyLayoutAside from './aside.vue'
import { menuStore } from "@/stores/module/menu"
const store = menuStore()

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