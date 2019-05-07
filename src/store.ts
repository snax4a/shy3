import Vue from 'vue';
import Api from '@/services/Api';
import faqs from '@/assets/data/faqs.json';
import utils from '@/utils';

export const store = Vue.observable({
  announcementSections: [],
  applePaySupported: false,
  cart: {
    count: 1,
    items: [{
      productId: 1, // must be unique, else increment quantity
      name: 'One-class pass',
      price: 18,
      quantity: 1,
      total: 18
    }],
    total: 18
  },
  classes: [],
  currentUser: {
    firstName: 'Guest',
    lastName: 'User',
    email: '',
    password: '',
    loggedIn: false,
    role: 'student',
    provider: 'local',
    optOut: false
  },
  faqs: [],
  locations: [],
  products: [],
  schedule: [],
  teachers: [],
  workshops: []
});

export const mutations = {
  async announcementsSet() {
    if (store.announcementSections.length === 0) {
      const { data } = await Api().get('/api/announcement');
      store.announcementSections = data;
    }
  },
  cartCountSet(count: number) {
    store.cart.count = count;
  },
  cartCountChange(changeAmount: number) {
    store.cart.count += changeAmount;
  },
  faqsSet() {
    if (store.faqs.length === 0) {
      const data: any = faqs;
      store.faqs = data;
    }
  },
  async locationsSet() {
    if (store.locations.length === 0) {
      const { data } = await Api().get('/api/location/active');
      store.locations = data;
    }
  },
  async scheduleSet() {
    if (store.schedule.length === 0) {
      const { data } = await Api().get('/api/schedule');
      store.schedule = utils.nest(data);
    }
  },
  async workshopsSet() {
    if (store.workshops.length === 0) {
      const { data } = await Api().get('/api/workshop/active');
      store.workshops = data;
    }
  }
};
