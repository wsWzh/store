<script  lang="jsx">
import MyLayoutHeader from './header.vue'
import MyLayoutAside from './aside.vue'
import { keepaliveList } from '../router/keepalive'
import { RouterView } from 'vue-router'
import { KeepAlive, Transition } from 'vue'
export default {
  name: 'Layout',
  setup() {

    return () => {
      return [
        <a-layout class="my-layout">
          <MyLayoutHeader />
          <a-layout class="arco-layout-has-sider">
            <MyLayoutAside />
            <a-layout class="main-wrap">
              <my-crumb>
                <a-button type="primary">常驻按钮</a-button>
              </my-crumb>
              <RouterView>
                {
                  ({ route, Component }) =>
                    <Transition name="fade">
                      <KeepAlive include={keepaliveList.value}>
                        {Component}
                      </KeepAlive>
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
  overflow: auto;
}

.my-layout{
  min-width: 1200px;
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