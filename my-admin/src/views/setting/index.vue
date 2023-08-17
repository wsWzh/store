<template>
  <div>
      <my-crumb-slot key="setting">
      <a-button size="mini" type="primary" @click="removeKeepalive('MemberList')">测试删除列表缓存</a-button>
    </my-crumb-slot>
    <a-layout class="list-wrap">
      <a-form :model="params">
        <a-form-item label="限制输入字母">
          <my-input v-model="params.name" :pattern="/^[a-zA-Z]{0,20}$/" />
        </a-form-item>
        <a-form-item label="限制输入金额">
          <my-input v-model="params.money" :pattern="/^(\d{1,10})?(\.([0-9]{0,2}))?$/" />
        </a-form-item>
        <a-form-item label="限制输入数字">
          <my-input v-model="params.number" :pattern="/^\d{1,20}$/" />
        </a-form-item>
        <a-form-item label="限制输入手机号">
          <my-input v-model="params.mobile" :pattern="/^1([3-9](\d{0,9})?)?$/" />
        </a-form-item>
        <a-form-item label="下拉框单选">
          <my-select v-model="params.type" :options="options" :formatter="({ id, name }) => [+id, name]" />
        </a-form-item>
        <a-form-item label="下拉框多选">
          <my-select v-model="params.types" :options="options" formatter="id,name" multiple @change="handleChange" />
        </a-form-item>
        <a-form-item label="日期区间">
          <my-date-range v-model:start="params.dateStart" v-model:end="params.dateEnd" />
        </a-form-item>
        <a-form-item label="地址选">
          <my-area-picker v-model="params.area" />
        </a-form-item>
        <a-form-item label="单选框">
          <my-radio v-model="params.radio" :options="options" formatter="id,name" />
        </a-form-item>
        <a-form-item label="复选框">
          <my-checkbox v-model="params.checkbox" :options="options" :formatter="({ id, name }) => [id, name]" />
        </a-form-item>
        <a-form-item label="开关">
          <my-tips error success>
            <my-switch v-model="params.switch" @change="useResolve" />
          </my-tips>
        </a-form-item>
        <a-form-item label="图片上传">
          <my-tips error position="right">
            <my-upload v-model="params.image" multiple :limit="3" :action="handleUpload" origin="https://static-nk.liux.co"
              style="width: unset" />
          </my-tips>
        </a-form-item>

      </a-form>
      <a-row style="padding-left: 50px;">
        <a-space wrap style="width: 600px;">
          <my-button @click="onJsonPost">json提交</my-button>
            <my-button @click="onFormPost">form提交</my-button>
          <a-button @click="$router.back()">返回</a-button>
          <a-button @click="onLogin">401</a-button>
          <a-button @click="$router.push({name:'nestRoute1',params:{id:123}})">去嵌套路由</a-button>
          <my-button @click="useResolve">提交按钮</my-button>
          <my-tips success>
            <my-button @click="useResolve">tips提交按钮</my-button>
          </my-tips>
          <my-tips success error>
            <my-button :disabled="true" type="primary" @click="useResolve">操作成功</my-button>
            <my-button type="primary" status="warning" @click="useReject">操作失败</my-button>
          </my-tips>
          <my-confirm status="danger" width="230px" title="你果真要删除它吗？" @confirm="useResolve">删除</my-confirm>
          <my-confirm type="primary" title="请选择审核状态">
            <template #default>
              <a-button type="primary">审核</a-button>
            </template>
            <template #cancel="attrs">
              <my-tips error success>
                <my-button @click="useReject" type="primary" status="warning">不通过</my-button>
              </my-tips>
            </template>
            <template #confirm="attrs">
              <my-tips error success>
                <my-button @click="useResolve" type="primary" status="success">通过</my-button>
              </my-tips>
            </template>
          </my-confirm>
          <my-tips error success>
            <!-- 子组件包含多个按钮时，同步所有子组件的状态 -->
            <my-download type="primary" @click="handleDownload">
              <template #icon><icon-download /></template>
              下载
            </my-download>
            <my-download type="outline" @click="handleExport({ abc: 123 })">
              <template #icon><icon-export /></template>
              导出
            </my-download>
            <my-upload :action="handleUpload">
              <template #upload-button="{ loading, disabled }">
                <a-button type="primary" :loading="loading" :disabled="disabled">
                  <template #icon><icon-upload /></template>
                  {{ loading ? '正在上传' : '点击上传' }}
                </a-button>
              </template>
            </my-upload>
          </my-tips>
        </a-space>
      </a-row>
    </a-layout>
  </div>

</template>

<script setup>
import { IconDownload, IconExport, IconUpload } from '@arco-design/web-vue/es/icon'
import { POST_SUCCESS, POST_ERROR, GET_DOWNLOAD, POST_UPLOAD , POST_CHANGE , GET_TOKEN , GET_USER_INFO } from '@/http'
import { http } from '@/http'
import { reactive, watch, toRaw, ref } from 'vue'
import { removeKeepalive } from '../../router/keepalive'

defineOptions({
  name:'BasicsComponents'
})

const params = reactive({
  name: 'Master',
  money: 999.999,
  number: 999,
  mobile: '18888888888',
  radio: '1',
  checkbox: '2',
  type: '2',
  switch: '',
  image: '',
  types: '1,2',
  // types :  [1,3] ,
})
setTimeout(() => {
  params.image = 'https://static-nk.liux.co/image8/13462fa/28194a0700023d15_400_400.jpg'
}, 1000)

watch(params, params => {
  console.log('params:', toRaw(params))
})

const options = [
  { id: 'aaa', name: 'aaa' },
  { id: '1', name: '选项一' },
  { id: 2, name: '选项二', disabled: true },
  { id: 3, name: '选项三' },
]

const useResolve = () => {
  return http.delete(POST_SUCCESS, { name: 'admin', password: 123456 })
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     reject({ message : '我去，居然成功了' })
  //   } , 1000)
  // })
}

const useReject = async () => {
  const res = await http({ url: POST_ERROR, params: { id: '999' } })
  console.log('useReject', res)
  return res
}

const handleChange = (v, e) => {
  console.log('handleChange', v, e)
}


const handleOk = close => {
  // setTimeout(close , 2000)
  return false
}

const handleDownload = () => {
  return http({ url: GET_DOWNLOAD, responseType: 'blob', intact: true })
}

const handleExport = params => {
  return http({ url: GET_DOWNLOAD, responseType: 'blob', params })
}

const handleUpload = (formData, config) => {
  return http.post(POST_UPLOAD, formData, config)
}

const onJsonPost=async ()=>{
  return await http.post(POST_CHANGE, params,{type:'json'})
}

const onFormPost = async () => {
  return await http.post(POST_CHANGE, params)
}

const onLogin=()=>{
  return  http.post(GET_TOKEN, params)
}

</script>

<style scoped lang="less">
.list-wrap {
  padding: 20px;

  &>.a-row {
    margin-top: 20px;
  }

  :deep(.my-input),
  :deep(.my-select),
  :deep(.my-date-range),
  :deep(.arco-select-view) {
    width: 300px;
  }

  .my-button+.my-button {
    margin-left: 10px;
  }
}
</style>