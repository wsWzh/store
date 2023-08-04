<template>
  <div>用户详情</div>
  <a-button @click="removeKeepalive('MemberList')">清除用户列表缓存</a-button>
</template>

<script setup>
import { ref } from 'vue'
import { removeKeepalive } from '../../router/keepalive';
</script>
<style scoped lang='scss'>
</style>