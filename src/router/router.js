import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import goTo from 'vuetify/es5/services/goto'
import store from '../store/store';

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
        name: 'SignIn',
        path: '/sign-in',
        component: () => import('../views/SignIn.vue')
    },
    {
        name: 'SignUp',
        path: '/sign-up',
        component: () => import('../views/SignUp.vue')
    },
    {
        name: 'Account',
        path: '/account',
        component: () => import('../views/Account.vue'),
        meta: {authRequired: true}
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
    if (to.meta.authRequired && !store.state.currentUser) {
        alert('You must be logged in to see this page');
        next({
            path: '/sign-in'
        })
    } else {
      next();
    }
  });
export default router;