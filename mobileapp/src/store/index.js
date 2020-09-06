import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart'
import common from './common'
import tmplist from './tmpgoodslist'
import {
  Dialog
} from 'vant'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

  },
  getters: {


  },
  mutations: {

  },
  actions: {},
  modules: {
    cart,
    common,
    tmplist
  }
})




export default store