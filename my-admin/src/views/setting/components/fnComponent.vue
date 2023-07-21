<!-- 测试组件的function -->
<script lang="jsx">
export default {
    name: 'fnComponent',
    emits: ['emitChange'],
    props: {
        onChange: Function
    },
    setup(props, { attrs, slots, emit }) {

        const fn = () => {
            // 通过props定义的方法( onChange )是从父组件传递给子组件的，
            //子组件可以直接调用该方法来实现与父组件的通信。父组件可以在子组件上绑定这个方法，并通过props将其传递给子组件。
            const res = props.onChange('props的方法') //通过props定义的方法可以从父组件拿到返回值
            console.log(res);
            //通过emit定义的方法(emitChange)是子组件向父组件发送消息的方式。
            //子组件可以使用 emit 方法触发这个自定义事件，并将需要传递给父组件的数据作为参数。父组件可以在子组件上监听这个自定义事件，并在事件被触发时执行相应的逻辑。
            emit('emitChange', 'emit触发的方法')
        }

        return () => {
            return <a-button onClick={fn}>触发</a-button>
        }
    }
}
</script>
