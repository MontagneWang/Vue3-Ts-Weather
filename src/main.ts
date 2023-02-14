import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from './language'
import 'element-plus/theme-chalk/src/index.scss'
import 'normalize.css/normalize.css'
// @ts-ignore
import Skeleton from '@x-ui-vue3/skeleton'

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(router)
    .use(VueI18n)
    .use(VueAxios, axios)
    .use(Skeleton)
    .mount('#app')
