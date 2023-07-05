import { Upload as AUpload } from "@arco-design/web-vue"

/**
 * 上传按钮
 */
export default {
    name: 'MyUpload',
    emits: [],
    props: {},
    setup(props, { attrs, slots, emit }) {
        return () => {
            return <AUpload action="/" />
        }
    }
}