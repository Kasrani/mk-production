import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
//import store from '../store';
import { fb } from "../firebase";

Vue.use(VueRouter);

const routes = [
    {
        name: 'Home',
        path: '/',
        component: () => import('../views/Home.vue'),
    },
    {
        name: 'Categories',
        path: '/categories',
        component: () => import('../views/Categories.vue'),
    },
    {
        name: 'Todo',
        path: '/todo',
        component: () => import('../views/Todo.vue'),
        meta: {requiresAuth: true}
    },
    {
        name: 'Orders',
        path: '/orders',
        component: () => import('../views/Orders.vue'),
        meta: {requiresAuth: true}
    },
    {
        name: 'ProductList',
        path: '/product-list',
        component: () => import('../sections/ProductList.vue'),
    },
    {
        name: 'Products',
        path: '/products',
        component: () => import('../sections/Products.vue'),
        meta: {requiresAuth: true}
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
        meta: {requiresAuth: true}
    },
    {
        name: 'Checkout',
        path: '/checkout',
        component: () => import('../views/Checkout.vue'),
        meta: {requiresAuth: true}
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


router.beforeEach((to, from, next) => {
    document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
    next()
})

router.afterEach(() => {
    goTo(0, { durantion: 0 })
})

/*
router.beforeEach((to, from, next) => {
    if (to.meta.authRequired && !store.state.currentUser) {
        //alert('You must be logged in to see this page');
        next({
            path: '/sign-in'
        })
    } else {
      next();
    }
  });
*/

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = fb.auth().currentUser
  
    if (requiresAuth && !currentUser) {
      next('/')
    } else {
      next()
    }
  })

export default router;
