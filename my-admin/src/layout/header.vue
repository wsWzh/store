<script lang="jsx">
import { getStore } from '../stores'
import { GET_USER_INFO } from '@/http'
import { computed } from 'vue'

/**
 * 顶部区域
 */

export default {
  name: 'LayoutHeader',
  setup() {
    const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

    const userInfo = computed(() => {
      return getStore(GET_USER_INFO).data
    })

    return () => {
      return [
        <a-row class="header" justify="space-between" align="center">
          <router-link to={{ name: 'home' }}>
            <a-row className="logo" align="center">
              <a-image src="/favicon.ico" />
              <h3>后台模版</h3>
            </a-row>
          </router-link>
          <a-row justify="end" align="center">
            <a-avatar size={26} src={circleUrl} />
            <a-divider direction="vertical" />
            <h5>{ userInfo.value?.name}</h5>
          </a-row>
        </a-row>
      ]
    }
  }
}

</script>
<style lang="less">
.header {
  height: 60px;
  border-bottom: 1px solid #eee;
  flex-shrink: 0;
  flex-grow: initial;
  padding: 0 20px;

  h3,
  h5 {
    margin: 0;
  }

  a {
    color: #333;
    text-decoration: none;

    &:hover {
      color: #449cfc;
    }
  }

  .logo {
    width: 300px;
    display: flex;

    .arco-image {
      height: 26px;
      margin-right: 20px;
    }

    &+.a-row {
      flex: 1;
      align-items: center;
    }
  }
}
</style>