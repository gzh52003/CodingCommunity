import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/cart'
import common from '@/store/common'
import current from '@/store/currentGoods'
// import {
//   Dialog
// } from 'vant'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username:''
  },
  getters: {


  },
  mutations: {
    login11(state,username11){
      console.log('sta',state,username11)
      state.username = username11
    },
    logOut(state){
      console.log('login',state)
      state.username = ''
    }
  },
  actions: {},
  modules: {
    cart,
    common,
    current
  }
})




export default store