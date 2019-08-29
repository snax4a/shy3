import Vue from 'vue';
import Vuelidate from 'vuelidate';
// import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faPhone, faMapMarkerAlt,
  faEnvelope, faCalendarAlt, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus, faTrashAlt, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFacebookF, faInstagram, faYoutube,
  faGoogle, faApple, faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { NavbarPlugin, ModalPlugin, CarouselPlugin, TabsPlugin, PaginationPlugin, ToastPlugin } from 'bootstrap-vue';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import './scss/app.scss';

// FontAwesome 5.0 - load each icon as SVG with tree-shaking to minimize size
library.add(faShoppingCart, faPhone, faEnvelope, faCalendarAlt, faMapMarkerAlt, faCalendarPlus,
  faTwitter, faFacebookF, faInstagram, faYoutube, faUser, faGoogle, faApple, faWindows,
  faTrashAlt, faCreditCard, faLock);
Vue.component('fa', FontAwesomeIcon);

Vue.directive('focus', {
  inserted: el => {
    el.focus();
  }
});

Vue.use(Vuelidate);

Vue.use(NavbarPlugin); // Includes NavPlugin, DrodownPlugin, CollapsePlugin
Vue.use(ModalPlugin);
Vue.use(CarouselPlugin);
Vue.use(TabsPlugin);
Vue.use(PaginationPlugin);
Vue.use(ToastPlugin);

Vue.config.productionTip = false;
// Vue.prototype.$http = axios; // if I ever want to add $http to the Vue instance

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
