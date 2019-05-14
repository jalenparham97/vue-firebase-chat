import Vue from 'vue'
import Router from 'vue-router'
import ChatConsole from './views/Chat/ChatConsole.vue'
import Login from './views/Auth/Login.vue'
import Signup from './views/Auth/Signup.vue'
import Workspace from './views/Workspace/Workspace.vue'
import JoinWorkspace from './views/Workspace/JoinWorkspace.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'ChatConsole',
    //   component: ChatConsole
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/new/workspace',
      name: 'Workspace',
      component: Workspace
    },
    {
      path: '/join/workspace',
      name: 'JoinWorkspace',
      component: JoinWorkspace
    },
    {
      path: '/:id',
      name: 'ChatConsole',
      component: ChatConsole
    }
  ]
})
