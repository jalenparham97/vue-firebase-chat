import db from '@/db/db'

const state = {
  currentChannel: {}
}
const mutations = {
  setCurrentChannel: (state, channel) => (state.currentChannel = channel)
}
const actions = {
  setChannel({ commit }, channel) {
    commit('setCurrentChannel', channel)
  }
}
const getters = {
  currentChannel: state => state.currentChannel
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
