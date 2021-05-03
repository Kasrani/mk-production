import store from '../store/store'
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
const database = firebase.initializeApp(firebaseConfig)

database.signUp = async (email, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        store.commit('setCurrentUser', firebase.auth().currentUser)
        return true
    } catch(error) {
        return error
    }
    
}

database.signIn = async (email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        store.commit('setCurrentUser', firebase.auth().currentUser)
        return true
    } catch(error) {
        return error
    }
    
}

database.signOut = async () => {
    try {
        await firebase.auth().signOut()
        store.commit('setCurrentUser', null)
        return true
    } catch(error) {
        return error
    }
    
}

export default database