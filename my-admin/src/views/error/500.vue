<template>
  <div class="error">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import './error.css'
const props = defineProps({
  message: { type: String, default: '服务异常' }
})
</script>
<style scoped lang='less'>

</style>