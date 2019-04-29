import Api from '@/services/Api';

export default {
  classesGet() {
      return Api().get('/api/class');
  },
  scheduleGet() {
    return Api().get('/api/schedule');
  },
};
