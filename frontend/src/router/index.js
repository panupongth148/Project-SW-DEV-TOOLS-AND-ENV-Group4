import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routers = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/store/frontstore',
    name: 'frontstore',
    component: () => import('../views/frontStore.vue')
  },
  {
    path: '/store/addbook/:storeId',
    name: 'addBook',
    component: () => import('../views/store/addBook.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routers
})

export default router
