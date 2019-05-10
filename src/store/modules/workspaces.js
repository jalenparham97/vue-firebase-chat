import router from '@/router'
import db from '@/db/db'

const state = {
  currentWorkspace: null
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
        router.push(`/${newWorkspace.id}`)
      })
      .catch(err => console.log(err))
  },
  loadWorkspace({ state, commit }, workspaceId) {
    const workspaceRef = db
      .collection('workspaces')
      .where('id', '==', workspaceId)
    if (!state.currentWorkspace) {
      workspaceRef.get().then(snapShot => {
        snapShot.docs.forEach(doc => {
          commit('setCurrentWorkspace', doc.data())
        })
      })
    }
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
