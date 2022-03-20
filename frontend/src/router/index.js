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
    path: '/store/managebook/:storeId',
    name: 'manageStore',
    component: () => import('../views/manageBook.vue')
  },
  {
    path: '/store/editbook/:bookId',
    name: 'editBook',
    component: () => import('../views/editBook.vue')
  },
  {
    path: '/store/addbook/:storeId',
    name: 'addBook',
    component: () => import('../views/addBook.vue')
  },
  {
    path: '/account/login',
    name: 'login',
    component: () => import('../views/account/login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routers
})

export default router