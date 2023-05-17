<template>
  <a-space direction="vertical">
    <a-space>
      按钮组件
      <my-tips success error>
        <my-button type="primary" status="success" @click="successBtn">成功提示按钮</my-button>
      </my-tips>
      <my-tips success error>
        <my-button type="primary" status="danger" @click="errorBtn">失败提示按钮</my-button>
      </my-tips>
      <my-button type="primary" @click="lodingBtn">加载按钮</my-button>
    </a-space>
  </a-space>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { http } from '@/http'
import { GET_USER_INFO } from '@/http/apis/user'


const successBtn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: '我去，居然成功了' })
    }, 1000)
  })
}

const errorBtn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({ message: '我去居然失败了' })
    }, 1000)
  })
}

const lodingBtn = async () => {
  return await http.get(GET_USER_INFO)
}
</script>
<style scoped lang='less'></style>