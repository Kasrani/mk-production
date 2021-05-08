import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { fb } from "./firebase";
import 'firebase/auth'
import 'firebase/firestore'
import VueFirestore from 'vue-firestore'
require('firebase/firestore')

Vue.use(VueFirestore, {
    key: 'id',         // the name of the property. Default is '.key'.
    enumerable: true  //  whether it is enumerable or not. Default is true.
})

import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

Vue.filter('currencyEuro', function (value, symbol) {
  let currency = Vue.filter('currency')
  symbol = symbol != null ? symbol : '€ '
  return currency(value, symbol, 2, { thousandsSeparator: '.', decimalSeparator: ',' })
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

fb.auth().onAuthStateChanged(user => {
  if(user) {
    store.commit('setCurrentUser', user)
  } else {
    store.commit('setCurrentUser', null)
  }

  initialize()
})