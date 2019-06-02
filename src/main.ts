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

// import BootstrapVue from 'bootstrap-vue';
// import { BCarousel, BCollapse, BDropdown, BModal, BNav, BNavbar, BPagination, BTabs, BToast } from 'bootstrap-vue/esm';
import BCarousel from 'bootstrap-vue/esm/components/carousel';
import BCollapse from 'bootstrap-vue/esm/components/collapse';
import BDropdown from 'bootstrap-vue/esm/components/dropdown';
import BModal from 'bootstrap-vue/esm/components/modal';
import BNav from 'bootstrap-vue/esm/components/nav';
import BNavbar from 'bootstrap-vue/esm/components/navbar';
import BPagination from 'bootstrap-vue/esm/components/pagination';
import BTabs from 'bootstrap-vue/esm/components/tabs';
import BToast from 'bootstrap-vue/esm/components/toast';

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

// Vue.use(BootstrapVue);
Vue.use(BCarousel);
Vue.use(BCollapse);
Vue.use(BDropdown);
Vue.use(BModal);
Vue.use(BNav);
Vue.use(BNavbar);
Vue.use(BPagination);
Vue.use(BTabs);
Vue.use(BToast);

Vue.config.productionTip = false;
// Vue.prototype.$http = axios; // if I ever want to add $http to the Vue instance

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
