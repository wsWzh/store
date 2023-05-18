<script lang="jsx">
import MyLayoutAside from './aside.vue'
import MyLayoutHeader from './header.vue'
import { KeepAlive } from 'vue'
import { useRouter } from 'vue-router'
import { keepaliveItems } from '../router/keepalive'


/**
 * 结构布局
 */
export default {
  name: 'Layout',
  setup() {

    const router = useRouter()

    // 测试更新页面缓存
    const handleKeepalive = () => {
      router.push({ name: 'MemberList' })
    }
    return () => [
      <a-layout class="my-layout">
        <MyLayoutHeader />
        <a-layout class="arco-layout-has-sider">
          <MyLayoutAside />
          <a-layout class="main-wrap">
            <my-crumb>
              <a-button size="mini" type="primary" onClick={handleKeepalive}>常驻按钮</a-button>
            </my-crumb>
            <a-layout>
              <router-view >
                {
                  ({ Component }) => <KeepAlive include={keepaliveItems.value}>{Component}</KeepAlive>
                }
              </router-view>
            </a-layout>
          </a-layout>
        </a-layout>
      </a-layout>
    ]
  }
}
</script>

<style scoped lang="less">
.my-layout,
.my-layout>.arco-layout,
:deep(.arco-table-element) {
  overflow: hidden;
}

:deep(.main-wrap>.arco-layout) {
  overflow: auto;
  padding: 20px;
}</style>