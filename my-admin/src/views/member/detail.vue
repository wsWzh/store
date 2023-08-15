<template>
  <div>
    <div>用户详情</div>
    <a-button @click="clear">清除用户列表缓存</a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const clear=()=>{
    router.back()
}

defineOptions({
  name:"memberDetail"
})
</script>
<style scoped lang='scss'>
</style>