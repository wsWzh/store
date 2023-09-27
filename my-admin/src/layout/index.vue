<script  lang="jsx">
import MyLayoutHeader from './header.vue'
import MyLayoutAside from './aside.vue'
import { keepaliveList } from '../router/keepalive'
import { useRouter ,RouterView} from 'vue-router'
import { KeepAlive, Transition, } from 'vue'
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
              <RouterView>
                {
                  ({ route, Component }) =>
                    <Transition name="fade">
                      <a-layout key={route.name}>
                        <KeepAlive include={keepaliveList.value}>{Component}</KeepAlive>
                      </a-layout>
                    </Transition>
                }
              </RouterView>
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
  padding: 20px;
  overflow: auto;

}

.component {
  flex: 1;
  padding: 20px;
  overflow: auto;
  height: 100%;
  overflow: hidden;
}

.fade-enter-active {
  transition: opacity 1.8s ease;
}

.fade-enter-from {
  opacity: 0;
}
</style>