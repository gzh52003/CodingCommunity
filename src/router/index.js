import Vue from 'vue';

// 1. 引入Vue-Router
import VueRouter from 'vue-router'
import Public from '../Pub.vue'
import axios from "axios"
import Home from '../pages/Home.vue'

import User from '../pages/user/Default.vue'
import UserList from '../pages/user/List.vue'
import UserAdd from '../pages/user/Add.vue'
import UserEdit from '../pages/user/Edit.vue'

import Blogs from '../pages/blogs/Default.vue'
import BlogsHome from '../pages/blogs/Blogs.vue'

import Comments from '../pages/comments/Default.vue'
import CommentsHome from '../pages/comments/Comments.vue'

import Reg from '../pages/loginReg/Reg.vue'
import Login from '../pages/loginReg/Login.vue'

import NotFound from '../pages/NotFound.vue'


// 2. 使用VueRouter
Vue.use(VueRouter)

// 3. 实例化并配置参数
const router = new VueRouter({
  // mode:'history', // 一般上线后改为history路由(需要额外配置服务器)
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/public',
      component: Public,
      children: [{
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          component: Home
        },
        {
          path: '/user',
          component: User,
          children: [{
            path: '',
            redirect: 'list'
          }, {
            path: 'add',
            component: UserAdd
          }, {
            path: 'list',
            component: UserList
          }, {
            name: 'userEdit',
            path: 'edit/:id',
            component: UserEdit
          }]
        },
        {
          path: '/blogs',
          component: Blogs,
          children: [{
            path: '',
            redirect: 'blogshome'
          }, {
            path: 'blogshome',
            component: BlogsHome
          }]
        },
        {
          path: '/comments',
          component: Comments,
          children: [{
            path: '',
            redirect: 'commentshome'
          }, {
            path: 'commentshome',
            component: CommentsHome
          }]
        },
      ]
    },
    {
      path: '/login',
      component: Login,

    },
    {
      path: '/reg',
      component: Reg
    },
    {
      path: '/404',
      component: NotFound
    },
    // 404页面效果
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

//  校验token是否一致,全局路由守卫
router.beforeEach(async (to, from, next) => { // 路由跳转前监控(保证登录状态)
  // 重登陆删除本地数据
  if (to.path === '/login') {
    localStorage.removeItem('token')
  }
  let user = JSON.parse(localStorage.getItem('token'))

  let res = await axios.get('http://localhost:10000/api/jwtverify', {
    params: {
      authorization: user
    }
  })

  // 登录验证：如果本地没有储存用户且不在登录页面则跳转

  if (to.path !== '/login' && to.path !== '/reg' && !res.data.code) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})






export default router;

console.log('router=', router);