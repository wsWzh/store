<template>
  <div style="width: 100%;">
    <a-form :model="model" auto-label-width>
      <a-row :gutter="20">
        <a-col :span="8">
          <a-form-item label="状态同步的按钮">
            <asyncStatus>
              <my-button type="primary" @click="cs">触发的按钮</my-button>
              <my-button status="danger" @click="cs">被影响的按钮</my-button>
            </asyncStatus>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="下拉分页的下拉框">
            <asyncSelect />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="预设插槽">
            <mySlots>
              <template #params="{ params, open }">
                <div>组件导出的参数:{{ params }}</div>
                <a-button @click="open">组件导出的方法</a-button>
              </template>
              <template #name2>
                <div> 我是自定义的name2</div>
              </template>
            </mySlots>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="组件的方法">
            <fnComponent @emitChange="emitChange" @change="change" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="组件的v-model">
            <testModelValue @update:loading="changeLoading" v-model:loading="loading" v-model="testValue" /> {{ testValue
            }}
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="组件的动画">
            <a-space direction="vertical">
              <a-radio-group v-model="active">
                <a-radio :value="'fnComponent'">fnComponent</a-radio>
                <a-radio :value="'testModelValue'">testModelValue</a-radio>
              </a-radio-group>
              <KeepAlive>
                <transition name="fade">
                  <component :is="componentOptions[active]"></component>
                </transition>
              </KeepAlive>
            </a-space>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="确定操作">
            <my-confirm title="确定要删除?">
                删除
            </my-confirm>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="测试pinia数据持久化">
            {{ options }}
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

  </div>
</template>
<script>
export default {
  name: "testComponents",
}
</script>

<script setup>
import { ref, shallowRef , computed } from 'vue'
import asyncStatus from './components/asyncStatus.vue'; //同步状态组件
import mySlots from './components/mySlots.vue'; //测试预设插槽组件
import fnComponent from './components/fnComponent.vue';//组件的方法
import testModelValue from './components/testModelValue.vue';//组件的v-model
import { getStore } from '@/stores'
import { GET_OPTIONS } from '@/http'

const model = ref({})

const cs = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: '我去，居然成功了' })
    }, 3000)
  })
}

const emitChange = (str) => {
  console.log(str);
}

const change = (str) => {
  console.log(str);
  return '我是父组件的值'
}

const loading = ref(false)

const changeLoading = (value) => {
  console.log(value);
}

const active = ref('fnComponent')

const componentOptions = {
  'fnComponent': fnComponent,
  'testModelValue': testModelValue,
}

// const activeComponent = shallowRef(fnComponent) //组件需要shallowRef


const testValue = ref('初始值')


const options=computed(()=>{
  return getStore(GET_OPTIONS).getters()
})

</script>
<style scoped lang='less'>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>