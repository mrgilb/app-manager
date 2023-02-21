import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    authState: false
  },
  getters: {
    error: state => state.error,
    authState: state => state.authState
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },

    setAuthState (state, auth) {
      state.authState = auth
    }
  },
  actions: {},
  modules: {
    auth
  }
})
