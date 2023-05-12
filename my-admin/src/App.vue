<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <RouterView />
</template>

<style lang="less">
// body{
//     --primary-1: 255,236,227 !important;
//     --primary-2: 255,210,190 !important;
//     --primary-3: 255,179,146 !important;
//     --primary-4: 255,158,115 !important;
//     --primary-5: 255,71,0 !important;
//     --primary-6: 255,128,72 !important;
//     --primary-7: 255,84,9 !important;
// }
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 960px;
  overflow: auto;

  .slide-view {
    width: 400px;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
