import * as VueRouter from 'vue-router'
import Weather from '../views/HomeWeather.vue'
import Ling from '../views/Ling.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Weather
    },
    {
        path: '/about',
        name: 'about',
        component: Ling
        // 动态加载
        // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

export default router

