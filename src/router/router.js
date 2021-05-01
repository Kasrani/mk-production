import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/pages/HomePage';
import ServicesPage from '../components/pages/ServicesPage';

Vue.use(VueRouter);

const routes = [
    {
        name: 'Home',
        path: '/',
        component: HomePage
    },
    {
        name: 'About',
        path: '/services',
        component: ServicesPage
    },
];

const router = new VueRouter({
    mode: 'history',
    base: '',
    routes
});

export default router;