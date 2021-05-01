import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/pages/Home';

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
        component: () => import('../components/pages/Todo.vue')
    },
    {
        name: 'Services',
        path: '/services',
        component: () => import('../components/pages/Services.vue')
    },
    {
        name: 'Contact',
        path: '/contact',
        component: () => import('../components/pages/Contact.vue')
    },
    {
        name: 'Signin',
        path: '/sign-in',
        component: () => import('../components/pages/Signin.vue')
    },
    {
        name: 'Join',
        path: '/join',
        component: () => import('../components/pages/Join.vue')
    },
];

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes
});

export default router;