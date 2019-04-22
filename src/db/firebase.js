import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyD6ONrqD-VQHAVRiue-Z5to4aC21i67TcE',
  authDomain: 'vue-chat-app-c186a.firebaseapp.com',
  databaseURL: 'https://vue-chat-app-c186a.firebaseio.com',
  projectId: 'vue-chat-app-c186a',
  storageBucket: 'vue-chat-app-c186a.appspot.com',
  messagingSenderId: '721903610849'
}
firebase.initializeApp(config)

export default firebase
