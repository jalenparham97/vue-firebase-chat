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
  autoLogin({ commit }) {
    firebase.auth().onAuthStateChanged(userData => {
      const userRef = db.collection('users').doc(userData.uid)
      userRef.get().then(user => {
        commit('setCurrentUser', { ...user.data() })
      })
    })
  },
  googleAuth({ commit }) {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(user => {
        if (user.additionalUserInfo.isNewUser) {
          const newUser = {
            id: user.user.uid,
            email: user.user.email,
            displayName: user.user.displayName
          }
          db.collection('users')
            .doc(newUser.id)
            .set(newUser)
            .then(() => {
              commit('setCurrentUser', newUser)
              router.push('/new/workspace')
            })
            .catch(err => console.log(err))
        } else {
          const userRef = db.collection('users').doc(user.user.uid)
          userRef
            .get()
            .then(currentUser => {
              commit('setCurrentUser', { ...currentUser.data() })
              router.push('/')
            })
            .catch(err => console.log(err))
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
const getters = {
  currentUser: state => state.currentUser
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}