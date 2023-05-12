<template>
  <div>
    基础组件
    <my-tips success error>
      <a-button @click="useResolve">tips提交按钮</a-button>
    </my-tips>
  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
const useResolve = () => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: '我去，居然成功了' })
    }, 1000)
  })
}
</script>
<style scoped lang='less'></style>