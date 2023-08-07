<template>
  <div>
    <div>用户详情</div>
    <a-button @click="clear">清除用户列表缓存</a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { removeKeepalive } from '../../router/keepalive';
import { useRouter } from 'vue-router';
const router = useRouter()
const clear=()=>{
  removeKeepalive('MemberList')
  setTimeout(()=>{
    router.back()
  },2000)
}
</script>
<style scoped lang='scss'>
</style>