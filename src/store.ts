import Vue from 'vue';
import Vuex from 'vuex';
import AnnouncementService from '@/services/AnnouncementService';
import FaqService from '@/services/FaqService';
import ClassService from '@/services/ClassService';
// import { RootState } from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    announcementSections: [],
    cart: {
      count: 0,
      items: [],
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
      optOut: false,
    },
    faqs: [],
    locations: [],
    products: [],
    schedule: [],
    teachers: [],
    workshops: [],
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
    scheduleSet(state, schedule) {
      state.schedule = schedule;
    },
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
    scheduleFetch(context) {
      if (this.state.schedule.length === 0) {
        const schedule = ClassService.scheduleGet();
        context.commit('scheduleSet', schedule);
      }
    },
  },
  getters: { // filtering operations mostly
  },
});
