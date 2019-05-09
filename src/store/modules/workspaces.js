import router from '@/router'
import db from '@/db/db'

const state = {
  currentWorkspace: {}
}
const mutations = {
  setCurrentWorkspace: (state, workspace) =>
    (state.currentWorkspace = workspace)
}
const actions = {
  addWorkspace({ commit }, newWorkspace) {
    const workspacesRef = db.collection('workspaces')
    workspacesRef
      .doc(newWorkspace.id)
      .set(newWorkspace)
      .then(() => {
        commit('setCurrentWorkspace', newWorkspace)
        router.push(`/${newWorkspace.workspace}`)
      })
      .catch(err => console.log(err))
  }
}
const getters = {
  currentWorkspace: state => state.currentWorkspace
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
