import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginWrap: false,
  },
  mutations: {
    setLoginWrapState(state, bool) {
      state.loginWrap = bool
    }
  },
  actions: {

  }
})
