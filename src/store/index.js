import Vue from 'vue'
import Vuex from 'vuex'
import register from './register'
import login from './login'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false
  },
  getters: {
  },
  mutations: {
    logIn (state) {
      state.isAuth = true
    },

    logOut (state) {
      state.isAuth = false
    }
  },
  actions: {
  },
  modules: {
    register, login
  }
})
