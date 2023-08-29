
<script lang="jsx">
export default {
    name: '',
    emits: [],
    props: {},
    setup(props, { attrs, slots, emit }) {

        const params ={
            name: 'wzh',
            age: 123
        }

        const open = () => {
            console.log('我是组件的open方法');
        }

        // 添加detault,name1,name2三个预设插槽
        const {
            params: paramsSlot = () => [],
            name1: name1Slot = () => <div>name1预设插槽,</div>,
            name2: name2Slot = () => <div>name2预设插槽</div>,
            default: defaultSlot = () => <div>默认插槽</div>
        } = slots

        // paramsSlot插槽默认返回一个空数组方便用concat
        return () => {
            return [
                ...paramsSlot({ params, open }),
                name1Slot(),
                name2Slot(),
                defaultSlot({params,open})
            ]
        }
    }
}
</script>