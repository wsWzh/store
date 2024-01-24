import { create } from "zustand";
import { http, GET_USER_INFO } from "../../http";
import { empty } from '@wzh-/utils'

const fmt = (set, get) => {
    return {
        userInfo: null,
        getUserInfo: async () => {
            const res = await http(GET_USER_INFO)
            set({ userInfo: res })
        },
        reset: () => set({ userInfo: null }),
    }
}

const useUserStore = create(fmt)

export default useUserStore;