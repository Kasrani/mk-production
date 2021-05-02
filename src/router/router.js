import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import goTo from 'vuetify/es5/services/goto'
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Todo',
        path: '/todo',
        component: () => import('../views/Todo.vue'),
        meta: {authRequired: true}
    },
    {
        name: 'Services',
        path: '/services',
        component: () => import('../views/Services.vue'),
        meta: {authRequired: true}
    },
    {
        name: 'Contact',
        path: '/contact',
        component: () => import('../views/Contact.vue'),
        meta: {authRequired: true}
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('../views/Login.vue')
    },
    {
        name: 'Register',
        path: '/register',
        component: () => import('../views/Register.vue')
    },
];

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
    next()
})

router.afterEach(() => {
    goTo(0, { durantion: 0 })
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
      if (firebase.auth().currentUser) {
        next();
      } else {
        alert('You must be logged in to see this page');
        next({
          path: '/',
        });
      }
    } else {
      next();
    }
  });

export default router;