import { empty } from './empty.js'

export function copyText(str) {
    if(empty(str)){
        return Promise.reject('没有执行复制')
    }
}
copyText()