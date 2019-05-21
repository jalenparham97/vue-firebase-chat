import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import firebase from './db/firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(SemanticUIVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('auth/autoLogin', user)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
