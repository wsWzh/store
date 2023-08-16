<template>
  <a-row justify="center" align="center">
    <a-image @click=onNav src="logo.png" width="100" :preview="false" />
  </a-row>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';


const router = useRouter()
const route = useRoute()

const onNav = () => {
  const { goto = '/member/list' } = route.query
  console.log(goto, route.fullPath);
  router.replace(goto)
}
</script>

<style scoped lang="less">
.arco-row {
  height: 100vh;
}
</style>