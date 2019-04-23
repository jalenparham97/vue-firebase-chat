import Vue from 'vue'
import Router from 'vue-router'
import ChatConsole from './views/ChatConsole.vue'
import Login from './views/Auth/Login.vue'
import Signup from './views/Auth/Signup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ChatConsole',
      component: ChatConsole
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
