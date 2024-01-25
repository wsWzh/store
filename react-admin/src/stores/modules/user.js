import { create } from "zustand";
import { http, GET_USER_INFO } from "../../http";
import { empty } from '@wzh-/utils'

const fmt = (set, get) => {
    return {
        data: null,
        action: async () => {
            const res = await http.get(GET_USER_INFO)
            set(state => ({ data: res }))
        },
        getter: () => {
            const { data, action } = get()
            if (empty(data)) {
                action()
            }
            return data
        }
    }
}

const useUserStore = create(fmt)
useUserStore.Storekey = GET_USER_INFO

export default useUserStore;