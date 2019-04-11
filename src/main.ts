import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faPhone, faMapMarkerAlt,
  faEnvelope, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './scss/app.scss';

// FontAwesome 5.0 - load icons as SVG with tree-shaking
library.add(faShoppingCart, faPhone, faEnvelope, faCalendarAlt, faMapMarkerAlt,
  faTwitter, faFacebookF, faInstagram, faYoutube, faUser);
Vue.component('fa', FontAwesomeIcon);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
