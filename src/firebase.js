/*
import store from './store/store'
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAYQJfKuhSTL5wPocI0K4CXChMsfp3XWEg",
    authDomain: "mk-production-40d68.firebaseapp.com",
    databaseURL: "https://mk-production-40d68-default-rtdb.firebaseio.com",
    projectId: "mk-production-40d68",
    storageBucket: "mk-production-40d68.appspot.com",
    messagingSenderId: "597137251934",
    appId: "1:597137251934:web:596547a7174d9afc219ecf",
    measurementId: "G-TVDREF4661"
});
// Initialize Firebase
//const database = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.database();

db.signUp = async (email, password) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        store.commit('setCurrentUser', firebase.auth().currentUser)
        return true
    } catch(error) {
        return error
    }
    
}

db.signIn = async (email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        store.commit('setCurrentUser', firebase.auth().currentUser)
        return true
    } catch(error) {
        return error
    }
    
}

db.signOut = async () => {
    try {
        await firebase.auth().signOut()
        store.commit('setCurrentUser', null)
        return true
    } catch(error) {
        return error
    }
    
}

export default db

*/


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyAYQJfKuhSTL5wPocI0K4CXChMsfp3XWEg",
    authDomain: "mk-production-40d68.firebaseapp.com",
    databaseURL: "https://mk-production-40d68-default-rtdb.firebaseio.com",
    projectId: "mk-production-40d68",
    storageBucket: "mk-production-40d68.appspot.com",
    messagingSenderId: "597137251934",
    appId: "1:597137251934:web:596547a7174d9afc219ecf",
    measurementId: "G-TVDREF4661"
}

const fb = firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const profilesCollection = db.collection('profiles')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  fb,
  profilesCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}