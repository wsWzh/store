
import { ref, reactive, computed,defineComponent } from 'vue'
import { empty } from '@/utils'
import { http, GET_PAGE } from '@/http'
import { Select as ASelect } from '@arco-design/web-vue'
export default defineComponent ({
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
             if (isNoMore.value) {
                return results.concat({ name: '没有更多了~', id: -1, disabled: true })
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
                return '向上滚动'//向上滚动不触发加载
            }
            scrollTopHistory.value = scrollTop
            const scrollTopMax = scrollHeight - offsetHeight;
            if (scrollTop < scrollTopMax - 20) {
                return '未达到加载高度'
            }
            if (loading.value) {
                return '加载中'
            }
            if (isNoMore.value) {
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
                dataInfo.value={}
                params.name=''
                await getDataInfo(params);
            }
        }

        const onSearch=async(keyword)=>{
            dataInfo.value=null
            params.pageNo=1
            params.name= keyword
            await getDataInfo(params)
        }

        return () => {

            const _attrs = {
                options: options.value,
                loading: useLoading.value,
                placeholder: '请选择',
                onFocus,
                onDropdownScroll: dropdownScroll,
                onSearch,
                fieldNames,
                allowSearch:true,
                allowClear:true,
                ...attrs
            }
            return <ASelect {..._attrs} v-slots={slots} />
        }
    }
})