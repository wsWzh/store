<script  lang="jsx">
import MyLayoutHeader from './header.vue'
import MyLayoutAside from './aside.vue'
import { keepaliveList } from '../router/keepalive'
import { useRouter } from 'vue-router'
import { KeepAlive, Transition } from 'vue'
export default {
  name: 'Layout',
  setup() {
    const router = useRouter()

    // 测试更新页面缓存
    const handleKeepalive = () => {
      router.push({ name: 'MemberList' })
    }
    return () => {
      return [
        <a-layout class="my-layout">
          <MyLayoutHeader />
          <a-layout class="arco-layout-has-sider">
            <MyLayoutAside />
            <a-layout class="main-wrap">
              <my-crumb>
                <a-button size="mini" type="primary" onClick={handleKeepalive}>常驻按钮</a-button>
              </my-crumb>
              <a-layout class="component">
                <router-view>
                  {{
                    default: ({ Component }) =>
                      <Transition enter-from-class="e-from" enter-active-class="e-active" enter-to-class="e-to">
                        <KeepAlive include={keepaliveList.value}>{Component}</KeepAlive>
                      </Transition>
                  }}
                </router-view>
              </a-layout>
            </a-layout>
          </a-layout>
        </a-layout>
      ]
    }
  }
}
</script>
<style scoped lang='less'>
.my-layout,
.my-layout>.arco-layout,
:deep(.arco-table-element) {
  overflow: hidden;
}

:deep(.main-wrap>.arco-layout) {
  overflow: auto;
  // align-items: flex-start;
}

.component>div {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.e-from {
  opacity: 0;
}

.e-to {
  opacity: 1;

}

.e-active {
  transition: all 0.5s;
}
</style>