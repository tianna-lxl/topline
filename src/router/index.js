import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Tabber from '@/views/tabber'
import Home from '@/views/home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }, {
    // name: 'tabber',
    path: '/home',
    component: Tabber,
    children: [{
      name: 'home',
      path: '',
      component: Home
    }]
  }]
})

export default router
