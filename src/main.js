import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Qs from 'qs'

Vue.prototype.$qs = Qs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
