import { createPinia } from "pinia";
import {debug,empty} from '@wangzhengheng/utils'

const mods=import.meta.globEager('./module/*.js')

const store = createPinia()
export default store