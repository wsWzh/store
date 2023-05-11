<template>
  <a-layout class="my-layout">
    <my-layout-header/>
    <a-layout class="arco-layout-has-sider">
      <my-layout-aside />
    </a-layout>
  </a-layout>
  <div @click="cs">{{ store.items}}</div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import MyLayoutHeader from './header.vue'
import MyLayoutAside from './aside.vue'
import { menuStore } from "@/stores/module/menu"
const store= menuStore()
const cs=()=>{
  store.GET_MENUS()
  console.log(store.items);
}
</script>
<style scoped lang='less'>
.my-layout{

}
</style>