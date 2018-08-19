import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Qs from 'qs'
import axios from './axios'
import {
  Input,
  Radio,
  Select,
  Option,
  Button,
  DatePicker,
  TimeSelect,
  TimePicker,
  Form,
  FormItem,
  Loading,
  Tag,
  Message,
} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/element-ui.scss'

Vue.prototype.$qs = Qs

Vue.use(Input)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)

Vue.use(axios, {
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'http://www.test/com'
})

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message

console.log(process.env.NODE_ENV)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

