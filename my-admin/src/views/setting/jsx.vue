<script lang="jsx">
import mySlots from './components/mySlots.vue'
// jsx 为什么要JSON.stringify 不能直接渲染对象类型 要转成字符串 vue的template帮你处理了所以不需要
export default{
    setup(){
        return ()=>{
            return <mySlots>
                {{
                    default:
                        ({ open, params }) => <div>
                            {JSON.stringify(params)},{open}
                        </div>,
                        params:({open,params})=><div onClick={open}>{params.name},123</div>
                }
                }
            </mySlots>
        }
    }
}
</script>