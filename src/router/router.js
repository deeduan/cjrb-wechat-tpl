import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: () => import('@/views/Index.vue')
        },
        {
            path: '/introduce',
            name: 'Introduce',
            component: () => import('@/views/Introduce.vue')
        },
        {
            path: '/range',
            name: 'Range',
            component: () => import('@/views/Range.vue')
        },
        {
            path: '/vote/:id',
            name: 'Vote',
            component: () => import('@/views/Vote.vue')
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
