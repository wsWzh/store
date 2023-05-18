<template>
  <div>
      <my-crumb-slot key="member">
      <a-button >重制</a-button>
      <a-button >更新</a-button>
      <my-button >搜索</my-button>
    </my-crumb-slot>
    {{ name }}
  </div>
</template>
<script>
export default {
  name: 'MemberList'
}
</script>
<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted } from 'vue'
const name = ref('')
setTimeout(() => {
  name.value = '用户列表'
},2000)
</script>
<style scoped lang='less'></style>