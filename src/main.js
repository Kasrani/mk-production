import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import VueFirestore from 'vue-firestore'
require('firebase/firestore')

Vue.use(VueFirestore, {
    key: 'id',         // the name of the property. Default is '.key'.
    enumerable: true  //  whether it is enumerable or not. Default is true.
})




Vue.use(VueFirestore)


import Swal from 'sweetalert2';

window.Swal = Swal;

Vue.config.productionTip = false

let app
const initialize = () => {
  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app')
  }
}

firebase.auth().onAuthStateChanged(user => {
  if(user) {
    store.commit('setCurrentUser', user)
  } else {
    store.commit('setCurrentUser', null)
  }

  initialize()
})