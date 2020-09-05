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
    path: '/classification',
    name: 'classification',
    component: () => import('@/views/Classification.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/Mine.vue')
  },
  {
    path: 'detail/:id',
    name: 'detail',
    component: () => import('@/views/Detail.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router