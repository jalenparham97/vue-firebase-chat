import firebase from '@/db/firebase'
import router from '@/router'
import db from '@/db/db'

const state = {
  currentUser: {}
}
const mutations = {
  setCurrentUser: (state, user) => (state.currentUser = user)
}
const actions = {
  googleAuth({ commit }) {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(user => {
        if (user.additionalUserInfo.isNewUser) {
          const newUser = {
            id: user.user.uid,
            email: user.user.email
          }
          db.collection('users')
            .doc(newUser.id)
            .set(newUser)
            .then(() => router.push('/'))
        } else {
          router.push('/')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
