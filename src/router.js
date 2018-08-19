import Vue from 'vue'
import Router from 'vue-router'
import Menu from './assets/js/menu'

Vue.use(Router)

let routes = []

Menu.forEach(item => {
  let fileUrl = item.path === '/' ? 'index' : item.path.slice(1)
  routes.push({
    path: item.path,
    name: item.name,
    component: () => import(`./views/${fileUrl}.vue`)
  })
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
