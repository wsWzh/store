export default class EventBus {
    constructor() {
        // 存储订阅事件 event:cbs
        this.events = {}
    }
    // 订阅事件。将事件的回调存到events中。
    on(event, cb) {
        this.events[event] ? this.events[event].push(cb) : this.events[event] = [cb]
        return this
    }
    // emit，触发事件。触发一次事件，会执行事件对应的所有回调。
    emit(event, ...args) {
        const cbs = this.events[event]
        cbs ? cbs.forEach(cb => cb(...args)) : console.log('没有订阅该事件')
        // 返回this方便链式调用
        return this
    }
    // off，注销事件。清除事件对应的所有回调。
    off(event, cb) {
        //如果没有cb，那就意味着移除所有监听
        //有的话，那就去除这个毁掉
        if (!cb) {
            this.events[event] = null
        } else {
            this.events[event] = this.events[event].filter(item => item !== cb)
        }
        return this
    }
    // 订阅一个仅执行一次的事件。
    once(event, cb) {
        const _cb = (...args) => {
            cb(...args)
            this.off(event, _cb)
        }
        this.on(event, _cb)
        return this
    }
}
