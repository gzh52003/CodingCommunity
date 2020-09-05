import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import request from '@/utils/request'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
Vue.use(ElementUI)

// 通过原型链共享ajax请求的方法
Vue.prototype.$request = request

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')