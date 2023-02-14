import {defineStore} from 'pinia'

export const usePositionStore = defineStore('Position', {
    state: () => ({
        count: 0,
        // 默认为杭州，之后通过 Map 组件拿到变化后的地理信息
        geoLocation:'101210111',
    }),
    getters: {
        // double: (state) => state.count * 2,
    },
    actions: {
        // increment() {
        //     this.count++
        // },
    },
})