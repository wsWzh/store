<template>
  <my-crumb-slot key="setting">
    <a-button size="mini" type="primary" @click="removeKeepalive('MemberList')">测试删除列表缓存</a-button>
  </my-crumb-slot>
  <a-space direction="vertical">
    <div>{{ name }}</div>
    按钮组件
    <a-space :size="20">
      <my-tips success error>
        <my-button type="primary" status="success" @click="successBtn">成功提示按钮</my-button>
      </my-tips>
      <my-tips success error>
        <my-button type="primary" status="danger" @click="errorBtn">失败提示按钮</my-button>
      </my-tips>
      <my-button type="primary" @click="lodingBtn">加载按钮</my-button>
      <my-confirm status="danger" @confirm="handleConfirm" title="确认要删除?">删除</my-confirm>
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
      <a-button @click="onDebounce">测试防抖</a-button>
      <a-button @click="onThrottle">测试节流</a-button>
      <a-button @click="onCopy">测试复制</a-button>
    </a-space>
    选项组件
    <a-space :size="20" wrap>
      <!-- <a-select :options="options" :field-names="{value:'key',label:'name'}"></a-select> -->
      地址选项:<my-area-picker v-model="area" />
      时间区间:<my-date-range v-model:end="endTime" v-model:start="startTime" />
      复选框:<my-checkbox v-model="checkbox" :options="options" :formatter="({ id, name }) => [id, name]" />
      单选框:<my-radio v-model="radio" :options="options" formatter="id,name"></my-radio>
      <a-space :size="20">
        下拉选项:<my-select placeholder="请选择下拉选项" :options="options" formatter="id,name" v-model="select" multiple allowClear
          @change="selectChage">
          <a-option :value="4">选项4</a-option>
        </my-select>
      </a-space>
      开关:
        <my-tips success>
          <my-switch v-model="status" @change="statusChange" />
        </my-tips>
       {{ status }}
    </a-space>
    上传,下载组件
    <a-space :size="20">
      <my-download type="primary" @click="download">下载</my-download>
      <my-upload />
    </a-space>
    输入框组件
    <a-space :size="20">
      数字输入框:<my-input v-model="inputValue" :pattern="/[1-9]$/" />
      字母输入框:<my-input v-model="inputValue1" :pattern="/^[a-zA-Z]$/" />
      金额输入框:<my-input v-model="inputValue3" :pattern="/^\d+(\.\d{0,2})?$/" />
      手机号输入框:<my-input v-model="inputValue4" :pattern="/^1([3-9](\d{0,9})?)?$/" />
    </a-space>
  </a-space>
</template>

<script>
export default {
  name: 'SettingProduct'
}
</script>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { http, GET_USER_INFO, GET_OPTIONS, GET_DOWNLOAD } from '@/http'
import { removeKeepalive } from '../../router/keepalive'
import { getStore } from '@/stores'
import { debounce, throttle, empty } from '@/utils'
import { copyText } from '../../../../utils'
const name = ref('')

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

const getOptions = computed(() => {
  return getStore(GET_OPTIONS).getters()
})


const area = ref('')
const checkbox = ref('1,2,3')
const options = [
  { id: 1, name: '选项一' },
  { id: 2, name: '选项二' },
  { id: 3, name: '选项三' },
]

const radio = ref(1)


const onDebounce = debounce(() => console.log('防抖'), 2000)

const onThrottle = throttle(() => console.log('节流'), 2000)


const onCopy = async () => {
  const res = await copyText('测试复制1')
  console.log(res);
}

const endTime = ref()
const startTime = ref()

const download = async () => {
  return await http({ url: GET_DOWNLOAD, responseType: 'blob', intact: true })
}

const inputValue = ref()
const inputValue1 = ref()
const inputValue3 = ref()
const inputValue4 = ref()

const select = ref('1,2,3')

const selectChage = (val) => {
  console.log(val);
}

const status = ref(1)

const statusChange = async (status) => {
  console.log(status);
 return await http({ url: GET_DOWNLOAD, responseType: 'blob', intact: true })
}

</script>
<style >
.my-select {
  width: 180px;
}
</style>