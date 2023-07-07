<template>
  <my-crumb-slot key="member">
    <a-button>重制</a-button>
    <a-button>更新</a-button>
    <my-button>搜索</my-button>
  </my-crumb-slot>
  <my-table history @request="requestApi" :columns="columns" v-model:loading="loading" @change="change"  v-model:selections="selections">
    <template #params="{ params, search }">
      <a-form :model="params" layout="inline" auto-label-width>
        <a-form-item label="名称">
          <a-input v-model="params.name"></a-input>
        </a-form-item>
        <a-form-item label="名称">
          <a-input v-model="params.name"></a-input>
        </a-form-item>
        <a-space align="start">
          <a-button @click="search" type="primary" :loading="loading">查询</a-button>
          <a-button @click="search(null)" :loading="loading" type="outline">重置</a-button>
        </a-space>
      </a-form>
    </template>
  </my-table>
</template>
<script>
export default {
  name: 'MemberList'
}
</script>
<script setup>
import { ref, computed } from 'vue'
import { http, GET_OPTIONS, GET_PAGE } from '@/http';
import { columns } from './columns'

const requestApi = async params => {
  const rs = await http.get(GET_PAGE, params)
  console.log(rs)
  return rs
}

const loading=ref(false)

const change=(value,params)=>{
  console.log(value, params);
}

const selections=ref([{
  "id": "aji7ss357jg62b81",
  "name": "测试aji7ss357jg62b81",
  "createTime": "2018-4-01 39:31:03",
  "status": 1,
  "picture": "https://static-nk.liux.co/image8/13462fa/28194a0700023d15_400_400.jpg"
}])

</script>
<style scoped lang='less'></style>