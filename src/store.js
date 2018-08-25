import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginWrap: false,
    registerWrap: false,
  },
  mutations: {
    setLoginWrapState(state, bool) {
      state.loginWrap = bool
    },
    setRegisterWrapState(state, bool) {
      state.registerWrap = bool
    }
  },
  actions: {

  }
})
