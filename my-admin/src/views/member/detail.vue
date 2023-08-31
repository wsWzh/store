<template>
    <a-space>
      <div>用户详情</div>
      <div>用户id:{{ route.params?.id }}</div>
      <a-input v-model="inputData"></a-input>
      <a-button @click="clear">清除用户列表缓存</a-button>
    </a-space>
</template>

<script setup>
import { ref } from 'vue'
import { removeKeepalive } from '../../router/keepalive';
import { useRouter, useRoute } from 'vue-router';

defineOptions({
  name: "MemberDetail"
})

const router = useRouter()
const route = useRoute()

const inputData = ref('')

const clear = () => {
  removeKeepalive('MemberList')
  router.back()
}

</script>
<style scoped lang='scss'></style>