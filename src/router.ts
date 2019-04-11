import Vue from 'vue';
import Router from 'vue-router';
import Classes from './views/Classes.vue';
import Workshops from './views/Workshops.vue';
import Cart from './views/Cart.vue';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Profile from './views/Profile.vue';
import Privacy from './views/Privacy.vue';
import Terms from './views/Terms.vue';
import Locations from './views/Locations.vue';
import TeacherTraining from './views/TeacherTraining.vue';
// import Admin from './views/Admin.vue';
// import SHYnet from './views/SHYnet.vue';

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
      component: Classes,
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
    {
      path: '/teachertraining',
      name: 'teachertraining',
      component: TeacherTraining,
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations,
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy,
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'), // lazy-loaded
    },
    {
      path: '/shynet',
      name: 'shynet',
      component: () => import(/* webpackChunkName: "shynet" */ './views/SHYnet.vue'), // lazy-loaded
    },
  ],
});
