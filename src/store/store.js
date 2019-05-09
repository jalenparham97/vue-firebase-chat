import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import auth from '@/store/modules/auth'
import workspaces from '@/store/modules/workspaces'
import channels from '@/store/modules/channels'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    open: false
  },
  mutations: {
    setOpenModal: (state, openModal) => (state.open = openModal)
  },
  actions: {
    toggleModal: ({ commit }, openModal) => {
      // console.log(openModal)
      commit('setOpenModal', openModal)
    }
  },
  getters: {
    open: state => state.open
  },

  modules: {
    auth,
    workspaces,
    channels
  }
})
