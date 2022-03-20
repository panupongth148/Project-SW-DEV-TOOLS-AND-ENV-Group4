import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/account/login',
    name: 'login',
    meta: { guess: true },
    component: () => import('../views/account/login.vue')
  },
  {
    path: '/account/register',
    name: 'register',
    meta: { guess: true },
    component: () => import('../views/account/register.vue')
  },
  {
    path: '/store/managebook/:storeId',
    name: 'manageStore',
    component: () => import('../views/store/managebook.vue')
  },
  {
    path: '/store/editbook/:bookId',
    name: 'editBook',

    component: () => import('../views/store/editbook.vue')
  },
  {
    path: '/store/addbook/:storeId',
    name: 'addBook',

    component: () => import('../views/store/addBook.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.meta.login && !isLoggedIn) {
    alert('You are a guess user. Please login to use this function.')
    next({ path: '/' })
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in.")
    next({ path: '/'})
  }

  next()
})

export default router
