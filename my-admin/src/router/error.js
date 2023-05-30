import {h ,render,createVNode} from 'vue'
import ErrorComponent from '@/views/error/500.vue'

//处理错误页
export function createErrorDoc (error){
    render(createVNode(ErrorComponent,error),document.getElementById('app'))
}

export function onError(error,to,from){
    console.log('router.onError', error, to, from)
    createErrorDoc(error)
}