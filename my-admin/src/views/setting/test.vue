<template>
  <div style="width: 100%;">
    <a-form :model="model" auto-label-width>
      <a-row :gutter="20">
        <a-col :span="8">
          <a-form-item label="状态同步的按钮">
            <asyncStatus>
              <my-button type="primary" @click="async">触发的按钮</my-button>
              <my-button status="danger" @click="async">被影响的按钮</my-button>
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
        <a-col :span="8">
          <a-form-item label="测试axios拦截">
            <a-space>
              <a-button @click="testAxios">发送请求</a-button>
              <a-button @click="testProxyAxios">二次封装axios的拦截器</a-button>
            </a-space>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="请求错误">
            <a-button @click="testErr">发送失败</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="滚动更新位置">
            <div style="width: 400px; height: 100px;overflow-y: auto;background-color: aliceblue;">
              <a-tooltip  trigger="click" content="滚动更新位置" background-color="#722ED1" :update-at-scroll="true">
                <template #content>
                  我是content插槽
                </template>
                <a-button style="margin: 100px;">tooltip</a-button>
              </a-tooltip>
            </div>
          </a-form-item>
        </a-col>
         <a-col :span="8">
            <a-form-item label="测试上传组件">
                  <a-upload action="/" :custom-request="customRequest" :limit="3" @update:fileList="fileListchange" :file-list="fileList" :show-file-list="true" multiple list-type="picture-card">
                    <template #extra-button>
                      <my-button>如来</my-button>
                    </template>
                  </a-upload>
            </a-form-item>
          </a-col>
      </a-row>
    </a-form>

  </div>
</template>
<script setup>
import { ref, shallowRef, computed } from 'vue'
import asyncStatus from './components/asyncStatus.vue'; //同步状态组件
import mySlots from './components/mySlots.vue'; //测试预设插槽组件
import fnComponent from './components/fnComponent.vue';//组件的方法
import testModelValue from './components/testModelValue.vue';//组件的v-model
import { getStore } from '@/stores'
import { GET_OPTIONS, POST_CHANGE, POST_ERROR, http } from '@/http'
import Axios from 'axios'

defineOptions({
  name:'testComponents'
})

const model = ref({})

const async = async () => {
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


const options = computed(() => {
  return getStore(GET_OPTIONS).getters()
})

const axios = Axios.create({
  baseURL: '/api',
  timeout: 70000,
})
axios.interceptors.response.use(res => {
  console.log(res, '我是拦截器');
  const suce = res.data.success
  if (suce) {
    return res
  }
  return Promise.reject({ message: '虽然你成功了,但是我要让你走catch' })

}, err => {
  console.log(err, '我是拦截器');
  return Promise.reject(err)
})

const ProxyAxios = () => {
  return new Promise((resolve, reject) => {
    axios({ url: POST_CHANGE, data: { age: 123 }, method: 'POST' }).then(res => {
      console.log(res);
      setTimeout(() => {
        resolve(res)
      }, 5000)
    }).catch(err => {
      setTimeout(() => {
        reject(err)
      }, 5000)
    })
  })
}
ProxyAxios.interceptors = axios.interceptors
//这里的拦截器是被axios拦截器影响后的  请求成功也不一定是res
ProxyAxios.interceptors.response.use(res => res, err => {
  return Promise.reject({ err, message: '不好意思我又封装了一层' })
})


const testAxios = () => {
  axios({ url: POST_CHANGE, data: { age: 123 }, method: 'POST' }).then(res => {
    // 成功了但是suce是false 想成功也走catch用拦截器
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
}

const testProxyAxios = () => {
  ProxyAxios().then(res => {
    console.log(res, '我是二次封装的axios');
  }).catch(err => {
    console.log(err, '我是二次封装的axios');
  })
}

const testErr = () => {
  axios({ url: POST_ERROR }).catch(err => {
    console.log(err);
  })
  http.get(POST_ERROR)
}


const customRequest=(option)=>{
  console.log('自定义上传', option);
}

const fileList=ref([])
const fileListchange=(fileList)=>{
  console.log(fileList);
}

</script>
<style scoped lang='less'>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}
</style>