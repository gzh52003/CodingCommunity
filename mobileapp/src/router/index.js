import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store/index.js'
import request from '@/utils/request.js'
Vue.use(VueRouter)

const routes = [
  {
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
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('@/views/Reg.vue')
  },
  {
    path: '/more',
    name: 'More',
    component: () => import('@/views/More.vue')
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import('@/views/Summary.vue')
  }
]

const router = new VueRouter({
  mode:"history",
  routes
})

export default router

router.beforeEach(async (to, from, next) => { // 路由跳转前监控(保证登录状态)

  let user = JSON.parse(localStorage.getItem('userInfo'))
  if (!user) {
    store.commit("clearTrolley")
  }
  if (from.name == 'cart') {
    let localTrolley = store.state.cart.goodslist.map(item => {
      return {
        goodsId: item._id,
        goodsTotal: item.total,
      };
    })
    request.post("/trolley", {
      userId: user._id,
      goodsInfo: JSON.stringify(localTrolley),
    }).then(res=>{
      if(res.data.code === 1001){
        console.log("购物车保存成功");
      }
    })
  }

  next()

})