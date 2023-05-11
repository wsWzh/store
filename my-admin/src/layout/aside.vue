

<script lang="jsx">
import { ref,computed } from 'vue'
import { GET_MENUS } from "@/http/apis/user"
import { IconApps } from '@arco-design/web-vue/es/icon'
import { menuStore } from "@/stores/module/menu"
import { useRoute,useRouter } from 'vue-router'
import { empty } from '@wangzhengheng/utils'

export default {
   name: "LayoutAside",
   setup() {
      const route=useRoute()
      const router=useRouter()

      const store = menuStore()

      const openKeys=ref([])
      const disabled = ref(false)

      // 将路由数组转成键值对
      const routes=router.getRoutes().reduce((routes,route)=>{
         const {name}=route
         return empty(name)? routes:{...routes ,[name]:route}
      },{})

      // 当前选中的路由数组
      const selectedKeys=computed(()=>{
         const items= route.matched.map(({name})=>name)
         openKeys.value=route.meta?.matched?.(items) || items
         return items
      })
      // 菜单数据
      const menuItems=computed(()=>{
         return store.items
      })

      // 点击菜单
      const doMenuItemClick= name =>{
         if(disabled){
            return
         }
         if(empty(routes[name])){
            return Promise.reject(new Error('不存在的路由'))
         }
         route.push({name})
      }

      //菜单展开or收起
      const onSubMenuClick=(items)=>{
         if (disabled.value) {
            return // 提示过程中不做改动
         }
         openKeys.value = items
      }

      return ()=>{
         const _arrts={
            openKeys:openKeys.value, //展开的菜单
            selectedKeys: selectedKeys.value, //选中的菜单项 key 数组
            onSubMenuclick ,//点击子菜单时触发
            autoScrollIntoView:true, //自动滚动选中项目到可见区域
            showCollapseButton:true, //内置折叠按钮
         }

         return
      }
   }
}
</script>
<style lang="less"></style>