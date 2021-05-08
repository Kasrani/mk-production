import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

import * as fb from '../firebase'
import router from '../router/index'

let database = new Localbase('database')
database.config.debug = false

let cart = window.localStorage.getItem('cart');

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appTitle: process.env.VUE_APP_TITLE,
        currentUser: null,
        cart: cart ? JSON.parse(cart) : [],
        showCart: {
            show: false,
        },
        search: null,
        tasks: [],
        snackbar: {
            show: false,
            text: '',
        },
        sorting: false
    },
    mutations: {
        addToCart(state, item) {
            let found = state.cart.find(product => product.productId == item.productId);   
            if(found) {
                // add no quantity
                found.productQuantity++;   
            } else {
                state.cart.push(item);
            }
            this.commit('saveData');
        },
        saveData(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart(state, item) {
            let index = state.cart.indexOf(item);
            state.cart.splice(index, 1);
            this.commit('saveData');
        },
        openModalToCart(state) {
            state.showCart.show = true
            //state.cart.push(dialog);
        },
        setCurrentUser(state, payload) {
            state.currentUser = payload
        },
        setSearch(state, value) {
            state.search = value
        },
        addTask(state, newTask) {
            state.tasks.push(newTask)
        },
        doneTask(state, id) {
            let task = state.tasks.filter((task) => task.id === id)[0]
            task.done = !task.done;
        },
        deleteTask(state, id) {
            state.tasks = state.tasks.filter((task) => task.id !== id)
        },
        updateTaskTitle(state, payload) {
            let task = state.tasks.filter((task) => task.id === payload.id)[0]
            task.title = payload.title
        },
        updateTaskDueDate(state, payload) {
            let task = state.tasks.filter((task) => task.id === payload.id)[0]
            task.dueDate = payload.dueDate
        },
        setTasks(state, tasks) {
            state.tasks = tasks
        },
        showSnackbar(state, text) {
            let timeout = 0
            if (state.snackbar.show) {
                state.snackbar.show = false
                timeout = 300
            }
            setTimeout(() => {
                state.snackbar.show = true
                state.snackbar.text = text
            }, timeout)
        },
        hideSnackbar(state) {
            state.snackbar.show = false
        },
        toggleSorting(state) {
            state.sorting = !state.sorting
        }
    },
    actions: {
        async signIn({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        
            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
            },
            async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.profilesCollection.doc(user.uid).get()
        
            // set user profile in state
            commit('setCurrentUser', userProfile.data())
            
            // change route to account
            if (router.currentRoute.path === '/sign-in') {
                router.push('/account')
            }
        },

        /*
        async signOut({ commit }) {
            location.reload();
            await fb.auth.signOut()
          
            // clear userProfile and redirect to /sign-in
            commit('setCurrentUser', {})
            router.push('/')
        },
        */

        // add task
        
        addTask({ commit }, newTaskTitle) {
            let newTask = {
                id: Date.now(),
                title: newTaskTitle,
                done: false,
                dueDate: null
            }
            database.collection('tasks').add(newTask).then(() => {
                commit('addTask', newTask)
                commit('showSnackbar', 'Tache ajoutée !')
            })
        },
        doneTask({ state, commit }, id) {
            let task = state.tasks.filter((task) => task.id === id)[0]
            database.collection('tasks').doc({ id: id }).update({
                done: !task.done
            }).then(() => {
                commit('doneTask', id)
            })
        },
        deleteTask({ commit }, id) {
            database.collection('tasks').doc({ id: id }).delete().then(() => {
                commit('deleteTask', id)
                commit('showSnackbar', 'Tache supprimée !')
            })
        },
        updateTaskTitle({ commit }, payload) {
            database.collection('tasks').doc({ id: payload.id }).update({
                title: payload.title
            }).then(() => {
                commit('updateTaskTitle', payload)
                commit('showSnackbar', 'Tache à jour !')
            })
        },
        updateTaskDueDate({ commit }, payload) {
            database.collection('tasks').doc({ id: payload.id }).update({
                dueDate: payload.dueDate
            }).then(() => {
                commit('updateTaskDueDate', payload)
                commit('showSnackbar', 'Date à jour !')
            })
        },
        setTasks({ commit }, tasks) {
            database.collection('tasks').set(tasks)
            commit('setTasks', tasks)
        },
        getTasks({ commit }) {
            database.collection('tasks').get().then(tasks => {
                commit('setTasks', tasks)
            })
        }
    },
    getters: {
        tasksFiltred(state) {
            if (!state.search) {
                return state.tasks
            }
            return state.tasks.filter(task =>
                task.title.toLowerCase().includes(state.search.toLowerCase())

            )
        }
    },
    modules: {

    }
})