import Vue from 'vue';
import Vuelidate from 'vuelidate';
// import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faPhone, faMapMarkerAlt,
  faEnvelope, faCalendarAlt, faUser, faLock, faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { faCalendarPlus, faTrashAlt, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFacebookF, faInstagram, faYoutube,
  faGoogle, faApple, faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// import BootstrapVue from 'bootstrap-vue';
import Badge from 'bootstrap-vue/es/components/badge';
import Button from 'bootstrap-vue/es/components/button';
import ButtonGroup from 'bootstrap-vue/es/components/button-group';
import Carousel from 'bootstrap-vue/es/components/carousel';
import Collapse from 'bootstrap-vue/es/components/collapse';
import Dropdown from 'bootstrap-vue/es/components/dropdown';
import Form from 'bootstrap-vue/es/components/form';
import FormInput from 'bootstrap-vue/es/components/form-input';
import FormCheckbox from 'bootstrap-vue/es/components/form-checkbox';
import FormGroup from 'bootstrap-vue/es/components/form-group';
import FormRadio from 'bootstrap-vue/es/components/form-radio';
import FormTextarea from 'bootstrap-vue/es/components/form-textarea';
import Image from 'bootstrap-vue/es/components/image';
import InputGroup from 'bootstrap-vue/es/components/input-group';
import Link from 'bootstrap-vue/es/components/link';
import Modal from 'bootstrap-vue/es/components/modal';
import Nav from 'bootstrap-vue/es/components/nav';
import NavBar from 'bootstrap-vue/es/components/navbar';

// import FormSelect from 'bootstrap-vue/es/components/form-select';
// import Pagination from 'bootstrap-vue/es/components/pagination';
// import Tabs from 'bootstrap-vue/es/components/tabs';
// import Toast from 'bootstrap-vue/es/components/toast';

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
Vue.use(Badge);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Carousel);
Vue.use(Collapse);
Vue.use(Dropdown);
Vue.use(Form);
Vue.use(FormCheckbox);
Vue.use(FormInput);
Vue.use(FormGroup);
Vue.use(FormRadio);
Vue.use(FormTextarea);
Vue.use(Image);
Vue.use(InputGroup);
Vue.use(Link);
Vue.use(Modal);
Vue.use(Nav);
Vue.use(NavBar);

// Vue.use(FormSelect);
// Vue.use(Pagination);
// Vue.use(Tabs);
// Vue.use(Toast);

Vue.config.productionTip = false;
// Vue.prototype.$http = axios; // if I ever want to add $http to the Vue instance

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
