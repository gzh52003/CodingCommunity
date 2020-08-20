import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/webApp/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manage',
    name: 'manage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/pages/manage/Index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
