import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from '../pages/manage/UserList.vue'
import Order from '../pages/manage/Order.vue'
import Goods from '../pages/manage/Goods.vue'
// import Home from '@/pages/webApp/Home.vue'
// import Index1 from './Index1.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/userlist',
    component: UserList
  },
  // {
  //   path: '/index1',
  //   component: Index1
  // },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/manage',
    name: 'manage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/manage/Index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
