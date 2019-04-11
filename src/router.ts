import Vue from 'vue';
import Router from 'vue-router';
// import Classes from './views/Classes.vue';
import Workshops from './views/Workshops.vue';
import Cart from './views/Cart.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/classes',
      name: 'classes',
      // component: Classes, // not lazy-loaded
      component: () => import(/* webpackChunkName: "classes" */ './views/Classes.vue'), // lazy-loaded
    },
    {
      path: '/workshops',
      name: 'workshops',
      component: Workshops,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
  ],
});
