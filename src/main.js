import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Qs from 'qs'
import axios from './axios'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$qs = Qs

Vue.use(axios, {
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'http://www.test/com'
})

console.log(process.env.NODE_ENV)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

