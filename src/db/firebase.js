import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const otherConfig = {
  apiKey: 'AIzaSyDgMy0yDlfp1kYIn4-59JMVJcCdlvTfSdc',
  authDomain: 'chat-app-vue-5d637.firebaseapp.com',
  databaseURL: 'https://chat-app-vue-5d637.firebaseio.com',
  projectId: 'chat-app-vue-5d637',
  storageBucket: 'chat-app-vue-5d637.appspot.com',
  messagingSenderId: '1042541843022',
  appId: '1:1042541843022:web:f14141cf2e2da09a'
}

const config = {
  apiKey: 'AIzaSyD6ONrqD-VQHAVRiue-Z5to4aC21i67TcE',
  authDomain: 'vue-chat-app-c186a.firebaseapp.com',
  databaseURL: 'https://vue-chat-app-c186a.firebaseio.com',
  projectId: 'vue-chat-app-c186a',
  storageBucket: 'vue-chat-app-c186a.appspot.com',
  messagingSenderId: '721903610849'
}

firebase.initializeApp(otherConfig)

export default firebase
