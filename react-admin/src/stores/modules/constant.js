import * as mods from '../../http/api/constant'
import { http } from '../../http'
import { create } from 'zustand'
import { empty } from '@wzh-/utils'

// 缓存时间 30分钟
const storageTimeOut = 1000 * 60 * 30


const createStore = url => {
    const defData = JSON.parse(sessionStorage.getItem(url))

    const fmt = (set, get) => {
        return {
            data: defData || {},
            action: async (params) => {
                const value = await http.get(url, params)
                const datetime = Date.now() + storageTimeOut
                const data = { value, datetime }
                sessionStorage.setItem(url, JSON.stringify(data))
                set(state => ({ data }))
            },
            getter: (params) => {
                const { data, action } = get()
                if (empty(data) || Date.now() > data.datetime ) {
                    action(params)
                }
                return data.value || []
            }
        }
    }
    return create(fmt)
}

const urls = Object.values(mods)

const constantStoresMap = urls.reduce((map, url) => {
    const store = createStore(url)
    return { ...map, [url]: store }
}, {})

export default constantStoresMap
