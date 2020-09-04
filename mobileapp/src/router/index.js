import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

  const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import( '@/views/Discover.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import( '@/views/Cart.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import( '@/views/Mine.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/Login.vue')
  },
  {
    path: '/reg',
    name: 'Reg  ',
    component: () => import( '@/views/Reg.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
