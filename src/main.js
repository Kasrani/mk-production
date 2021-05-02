import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import vuetify from './plugins/vuetify';
import router from './router/router';
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAYQJfKuhSTL5wPocI0K4CXChMsfp3XWEg",
    authDomain: "mk-production-40d68.firebaseapp.com",
    databaseURL: "https://mk-production-40d68-default-rtdb.firebaseio.com",
    projectId: "mk-production-40d68",
    storageBucket: "mk-production-40d68.appspot.com",
    messagingSenderId: "597137251934",
    appId: "1:597137251934:web:596547a7174d9afc219ecf",
    measurementId: "G-TVDREF4661"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//vuetify.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
