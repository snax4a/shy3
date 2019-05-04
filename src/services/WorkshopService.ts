import Api from '@/services/Api';

export default {
  workshopsGet() {
      return Api().get('/api/workshop/active');
  }
};
