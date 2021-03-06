import firebase from '@/db/firebase'
import router from '@/router'
import db from '@/db/db'
import md5 from 'md5'

const state = {
  currentUser: {},
  error: ''
}
const mutations = {
  setCurrentUser: (state, user) => (state.currentUser = user),
  setError: (state, error) => (state.error = error)
}
const actions = {
  logout({ commit }) {
    localStorage.removeItem('user')
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setCurrentUser', {})
        router.push('/login')
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
          localStorage.setItem('user', 'user')
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
    const { email, password, displayName } = newUser
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        localStorage.setItem('user', 'user')
        user.user
          .updateProfile({
            displayName,
            photoURL: `https://www.gravatar.com/avatar/${md5(
              email
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
        commit('setError', error)
        console.log(error)
      })
  },
  signInWithEmail({ commit }, user) {
    const { email, password } = user
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        const userRef = db.collection('users').doc(currentUser.user.uid)
        userRef
          .get()
          .then(signedInUser => {
            localStorage.setItem('user', 'user')
            commit('setCurrentUser', { ...signedInUser.data() })
            if (localStorage.workspaceId) {
              router.push(`/${localStorage.workspaceId}`)
            } else {
              router.push('/join/workspace')
            }
          })
          .catch(err => console.log(err))
      })
  }
}
const getters = {
  currentUser: state => state.currentUser,
  error: state => state.error
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
