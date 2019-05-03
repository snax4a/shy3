import Api from '@/services/Api';

export default {
  locationsActiveGet() {
      return Api().get('/api/location/active');
  }
};
