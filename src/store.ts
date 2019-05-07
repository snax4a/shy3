import Vue from 'vue';
import Vuex from 'vuex';
import AnnouncementService from '@/services/AnnouncementService';
import FaqService from '@/services/FaqService';
import ClassService from '@/services/ClassService';
import LocationService from '@/services/LocationService';
import WorkshopService from '@/services/WorkshopService';
// import { RootState } from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    announcementSections: [],
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
  },
  mutations: {
    announcementsSet(state, announcementSections) {
      state.announcementSections = announcementSections;
    },
    // classesSet(state, classes) {
    //   state.classes = classes;
    // },
    countChange(state, changeAmount) {
      state.cart.count += changeAmount;
    },
    faqsSet(state, faqs) {
      state.faqs = faqs;
    },
    locationsSet(state, locations) {
      state.locations = locations;
    },
    scheduleSet(state, schedule) {
      state.schedule = schedule;
    },
    workshopsSet(state, workshops) {
      state.workshops = workshops;
    }
  },
  actions: {
    addToCart(context) {
      context.commit('countChange', 1);
    },
    async announcementsFetch(context): Promise<any> {
      if (this.state.announcementSections.length === 0) { // only once per visit
        const { data } = await AnnouncementService.announcementsGet();
        context.commit('announcementsSet', data);
      }
      return null;
    },
    // classesFetch(context) {
    //   if (this.state.classes.length === 0) {
    //     const classes = ClassService.classesGet();
    //     context.commit('classesSet', classes);
    //   }
    // },
    faqsFetch(context) {
      if (this.state.faqs.length === 0) {
        const faqs = FaqService.faqsGet();
        context.commit('faqsSet', faqs);
      }
    },
    async locationsFetch(context): Promise<any> {
      if (this.state.locations.length === 0) {
        const { data } = await LocationService.locationsActiveGet();
        context.commit('locationsSet', data);
      }
    },
    async scheduleFetch(context): Promise<any> {
      if (this.state.schedule.length === 0) {
        const { data } = await ClassService.scheduleGet();
        context.commit('scheduleSet', ClassService.nest(data));
      }
    },
    async workshopsFetch(context): Promise<any> {
      if (this.state.workshops.length === 0) {
        const { data } = await WorkshopService.workshopsGet();
        context.commit('workshopsSet', data);
      }
    }
  },
  getters: { // filtering operations mostly
  }
});
