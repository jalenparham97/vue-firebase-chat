import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import auth from '@/store/modules/auth'
import workspaces from '@/store/modules/workspaces'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    workspaces
  }
})
