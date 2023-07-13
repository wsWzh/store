
<script  lang="jsx">
import { ref, reactive, computed } from 'vue'
import { empty } from '@/utils'
import { http, GET_PAGE } from '@/http'
export default {
    name: 'asyncSelect',
    emits: [],
    props: {
        label: String
    },
    setup(props, { attrs, slots, emit }) {

        const fieldNames={value:'id',label:'name'}

        // 加载标识
        const loading = ref(false)

        // 只有初始化才需要loading
        const useLoading = computed(() => {
            if (empty(dataInfo.value)) {
                return loading.value;
            }
        });

        // 储存的数据
        const dataInfo = ref()

        // 没有更多标识
        const isNoMore = computed(() => {
            if (empty(dataInfo.value)) {
                return false
            }
            const { pageNo, totalPage } = dataInfo.value
            return pageNo >= totalPage
        })

        // 是否添加数据到数组 标识
        const flag = ref(true);

        // params 请求参数
        const params = reactive({
            pageNo: 1,
            pageSize: 10,
            name: ''
        })

        // 下拉框的选项
        const options = computed(() => {
            if (empty(dataInfo.value)) {
                return []
            }
            const { results } = dataInfo.value

            if (loading.value) {
               return results.concat({ name: '加载中', id: 0, disabled: true })
            }

            return results
        })

        const getDataInfo = async (params) => {
            loading.value = true
            const result = await http.get(GET_PAGE, params)
            const pageNo = dataInfo.value?.pageNo || 0
            if (pageNo > 0) {
                result.results = dataInfo.value.results.concat(result.results) //分页合并
            }
            dataInfo.value = result//当前数据
            loading.value = false //加载标识
        }

        // 记录滚动的距离
        const scrollTopHistory = ref(0)

        // 滚动时触发
        const dropdownScroll = ({ target }) => {
            const { scrollTop, scrollHeight, offsetHeight } = target
            if (scrollTopHistory.value > scrollTop) {
                scrollTopHistory.value = scrollTop;
                console.log('向上滚动');
                return '向上滚动'//向上滚动不触发加载
            }
            scrollTopHistory.value = scrollTop
            const scrollTopMax = scrollHeight - offsetHeight;
            if (scrollTop < scrollTopMax - 20) {
                console.log('未达到加载高度');
                return '未达到加载高度'
            }
            if (loading.value) {
                console.log('加载中');
                return '加载中'
            }
            if (isNoMore.value) {
                if(flag.value){
                   dataInfo.value.results= dataInfo.value.results.concat({ name: '没有更多啦~', id: -1, disabled: true })
                }
                flag.value = false;
                console.log('没有更多啦~');
                return '没有更多啦~'
            }
            // 列表长度小于数据总长度
            params.pageNo = params.pageNo + 1;
            getDataInfo(params);
        }

        // 聚焦
        const onFocus = async () => {
            if (empty(dataInfo.value)) {
                getDataInfo(params)
            }
            if (!empty(params.name)) {
                await getDataInfo(params);
                params.name = '';
            }
        }


        return () => {

            const _attrs = {
                options: options.value,
                loading: useLoading.value,
                placeholder: '请选择',
                onFocus,
                onDropdownScroll: dropdownScroll,
                fieldNames,
                ...attrs
            }
            return <a-select {..._attrs} v-slots={slots} />
        }
    }
}
</script>