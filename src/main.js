import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import vuetify from './plugins/vuetify';
import router from './router/router';
import firebase from "firebase";

//vuetify.config.productionTip = false

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


