import Vue from 'vue'
import Router from 'vue-router'
import ChatConsole from './views/ChatConsole.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'ChatConsole',
      component: ChatConsole
    }
  ]
})
