import firebase from '@/db/firebase'
import router from '@/router'
import db from '@/db/db'
import md5 from 'md5'

const state = {
  currentUser: {}
}
const mutations = {
  setCurrentUser: (state, user) => (state.currentUser = user)
}
const actions = {
  logout({ commit }) {
    localStorage.removeItem('user')
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setCurrentUser', {})
        router.push('/signup')
      })
  },
  autoLogin({ commit }, user) {
    const userRef = db.collection('users').doc(user.uid)
    userRef.get().then(user => {
      commit('setCurrentUser', { ...user.data() })
    })
  },
  googleAuth({ commit }) {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(user => {
        localStorage.setItem('user', 'user')
        if (user.additionalUserInfo.isNewUser) {
          const newUser = {
            id: user.user.uid,
            email: user.user.email,
            displayName: user.user.displayName,
            avatar: user.user.photoURL
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
          localStorage.setItem('user', 'user')
          userRef
            .get()
            .then(currentUser => {
              commit('setCurrentUser', { ...currentUser.data() })
              if (localStorage.workspaceId) {
                router.push(`/${localStorage.workspaceId}`)
              } else {
                router.push('/join/workspace')
              }
            })
            .catch(err => console.log(err))
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  signUpWithEmail({ commit }, newUser) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(user => {
        user.user
          .updateProfile({
            displayName: newUser.displayName,
            photoURL: `https://www.gravatar.com/avatar/${md5(
              newUser.email
            )}?d=identicon`
          })
          .then(() => {
            const currentUser = {
              id: user.user.uid,
              email: user.user.email,
              displayName: user.user.displayName,
              avatar: user.user.photoURL
            }
            db.collection('users')
              .doc(currentUser.id)
              .set(currentUser)
            commit('setCurrentUser', currentUser)
            router.push('/new/workspace')
          })
          .catch(err => console.log(err))
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
