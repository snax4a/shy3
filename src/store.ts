import Vue from 'vue';
import Vuex from 'vuex';
import AnnouncementService from '@/services/AnnouncementService';
import FaqService from '@/services/FaqService';
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
    countChange(state, changeAmount) {
      state.cart.count += changeAmount;
    },
    faqsSet(state, faqs) {
      state.faqs = faqs;
    },
    announcementsSet(state, announcementSections) {
      state.announcementSections = announcementSections;
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
    faqsFetch(context) {
      if (this.state.faqs.length === 0) {
        const faqs = FaqService.faqsGet();
        context.commit('faqsSet', faqs);
      }
    },
  },
  getters: { // filtering operations mostly
  },
});
