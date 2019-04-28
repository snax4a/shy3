import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
// import BCarousel from 'bootstrap-vue/es/components/carousel/carousel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faPhone, faMapMarkerAlt,
  faEnvelope, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFacebookF, faInstagram, faYoutube,
  faGoogle, faApple, faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './scss/app.scss';

// FontAwesome 5.0 - load each icon as SVG with tree-shaking to minimize size
library.add(faShoppingCart, faPhone, faEnvelope, faCalendarAlt, faMapMarkerAlt, faCalendarPlus,
  faTwitter, faFacebookF, faInstagram, faYoutube, faUser, faGoogle, faApple, faWindows);
Vue.component('fa', FontAwesomeIcon);

Vue.use(BootstrapVue);
// Vue.component('b-carousel', BCarousel); // requires @types/bootstrap-vue which doesn't exist

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
