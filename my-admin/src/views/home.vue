<template>
  <a-row justify="center" align="center">
    <router-link :to="{ name: 'Member' }">
      <a-image src="logo.png" width="100" :preview="false" />
    </router-link>
  </a-row>
</template>

<script setup>


</script>

<style scoped lang="less">
.arco-row {
  height: 100vh;
}
</style>