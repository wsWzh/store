<template>
  <my-crumb-slot key="setting">
    <a-button size="mini" type="primary" @click="removeKeepalive('MemberList')">测试删除列表缓存</a-button>
  </my-crumb-slot>
  <a-space direction="vertical">
    <div>{{ name }}</div>
    <a-space>
      按钮组件
      <my-tips success error>
        <my-button type="primary" status="success" @click="successBtn">成功提示按钮</my-button>
      </my-tips>
      <my-tips success error>
        <my-button type="primary" status="danger" @click="errorBtn">失败提示按钮</my-button>
      </my-tips>
      <my-button type="primary" @click="lodingBtn">加载按钮</my-button>
      <my-confirm status="danger" @confirm="handleConfirm" title="确认要删除?">确认删除按钮</my-confirm>
      <my-confirm type="primary">
        <template #default>
          <a-button>自定义插槽</a-button>
        </template>
        <template #cancel="attrs">
          <my-tips error success>
            <my-button @click="errorBtn" type="primary" status="warning">自定义取消</my-button>
          </my-tips>
        </template>
        <template #confirm="attrs">
          <my-tips error success>
            <my-button @click="successBtn" type="primary" status="success">自定义确定</my-button>
          </my-tips>
        </template>
      </my-confirm>
    </a-space>
  </a-space>
</template>

<script>
export default {
  name: 'SettingProduct'
}
</script>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { http } from '@/http'
import { GET_USER_INFO } from '@/http/apis/user'
import { removeKeepalive } from '../../router/keepalive'
const name = ref('')
setTimeout(() => name.value = '基础组件', 2000)
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

const handleConfirm = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: '删除成功' })
    }, 1000)
  })
}

</script>
<style scoped lang='less'></style>