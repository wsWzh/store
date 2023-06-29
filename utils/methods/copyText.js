import { empty } from './empty.js'

export function copyText(str) {
    if (empty(str)) {
        return Promise.reject('没有执行复制')
    }
    const input = document.createElement('input')
    input.style.cssText = 'position:absolute;z-index:-1;opacity:0'
    input.value = str
    document.body.appendChild(input)
    input.focus()
    input.select()
    document.execCommand("copy")
    document.body.removeChild(input)
    return Promise.resolve('复制成功')
}