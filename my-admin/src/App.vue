<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <router-view />
</template>

<style lang="less">
html,
body {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
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
