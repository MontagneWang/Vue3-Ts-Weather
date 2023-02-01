import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$http = axios

createApp(App)
    .use(pinia)
    .use(router)
    .use(VueAxios,axios)
    .mount('#app')
