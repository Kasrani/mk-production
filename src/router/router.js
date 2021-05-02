import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';

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
        component: () => import('../views/Todo.vue')
    },
    {
        name: 'Services',
        path: '/services',
        component: () => import('../views/Services.vue')
    },
    {
        name: 'Contact',
        path: '/contact',
        component: () => import('../views/Contact.vue')
    },
    {
        name: 'Signin',
        path: '/sign-in',
        component: () => import('../views/Signin.vue')
    },
    {
        name: 'Join',
        path: '/join',
        component: () => import('../views/Join.vue')
    },
];

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes
});

export default router;