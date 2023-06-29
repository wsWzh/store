

<script lang="jsx">
import { ref, computed } from 'vue'
import { GET_MENUS } from "@/http/apis/user"
import { IconApps } from '@arco-design/web-vue/es/icon'
import menuPinia from "@/stores/modules/menu"
import { useRoute, useRouter } from 'vue-router'
import { empty } from '@my-wzh/utils'

export default {
   name: "LayoutAside",
   setup() {
      const route = useRoute()
      const router = useRouter()



      const openKeys = ref([])
      const disabled = ref(false)
      const doUpdateDisabled = bool => disabled.value = bool

      // 将路由数组转成键值对
      const routes = router.getRoutes().reduce((routes, route) => {
         const { name } = route
         return empty(name) ? routes : { ...routes, [name]: route }
      }, {})

      // 当前选中的路由数组
      const selectedKeys = computed(() => {
         const items = route.matched.map(({ name }) => name)
         openKeys.value = route.meta?.matched?.(items) || items
         return items
      })

      const menuStore = menuPinia()

      // 菜单数据
      const menuItems = computed(() => {
         return menuStore.data
      })

      // 点击菜单
      const doMenuItemClick = name => {
         if (disabled.value) {
            return // 提示过程中不做跳转
         }
         if (empty(routes[name])) {
            return Promise.reject(new Error('不存在的路由'))
         }
         router.push({ name })
      }

      //菜单展开or收起
      const onSubMenuClick = (name, items) => {
         if (disabled.value) {
            return // 提示过程中不做改动
         }
         openKeys.value = items
      }
      // 重构子组件的 click 事件，添加异常反馈。配合 my-tips 组件做出提示
      const tempMenuItem = (props, { slots, emit }) => {
         const { onClick } = props
         const items = slots.default()
         items[0].props.onClick = () => {
            onClick[0]()?.catch(error => emit('error', error))
         }
         return items
      }

      return () => {
         const _arrts = {
            openKeys: openKeys.value, //展开的菜单
            selectedKeys: selectedKeys.value, //选中的菜单项 key 数组
            onSubMenuClick,//点击子菜单时触发
            autoScrollIntoView: true, //自动滚动选中项目到可见区域
            showCollapseButton: true, //内置折叠按钮
            autoOpenSelected: true,//默认展开选中的菜单
            levelIndent: 30//层级组件缩进
         }

         const getMenuItem = (item, lv) => {
            const { name, routeName, children } = item
            const Icon = routes[routeName]?.meta?.icon || IconApps
            // a-menu-item 最后一级
            if (empty(children)) {
               const itemSlots = { default: () => name }
               //0级才有icon
               if (lv < 1) {
                  itemSlots.icon = () => <Icon />
               }
               return [
                  <my-tips error position="right" onUpdate:visible={doUpdateDisabled}>
                     <tempMenuItem onClick={() => doMenuItemClick(routeName)}>
                        <a-menu-item key={routeName} v-slots={itemSlots} />
                     </tempMenuItem>
                  </my-tips>
               ]
            }
            //a-sub-menu
            const subMenuSlots = {
               title: () => name,
               default: () => children.map(item => getMenuItem(item, lv + 1))
            }
            if (lv < 1) {
               subMenuSlots.icon = () => <Icon />
            }
            return <a-sub-menu key={routeName} v-slots={subMenuSlots} />
         }

         return [
            <a-layout-sider class="my-aside">
               <a-menu {..._arrts}>
                  {menuItems.value.map(item => getMenuItem(item, 0))}
               </a-menu>
            </a-layout-sider>
         ]
      }
   }
}
</script>
<style lang="less">
.my-aside {
   width: initial !important;

   .arco-menu {
      width: 200px;
      height: 100%;

      &.arco-menu-collapsed {
         width: 48px;
      }
   }
}
</style>