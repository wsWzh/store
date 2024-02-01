<script lang="jsx">
export default {
    name: '',
    emits: [],
    props: {},
    setup(props, { attrs, slots, emit }) {

        const _slots   = slots.default()[0]

        const _onClick   =  ()  => {
            console.log('内置的click');
        }


        if  (_slots.props.onClick ) {
                _slots.props.onClick=[_slots.props.onClick,_onClick]
        }

        Object.assign(_slots,  {})

        return () => {
            return _slots
        }
    }
}
</script>